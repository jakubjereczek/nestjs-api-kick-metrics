import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../../auth/auth.service';
import { AUTHORIZED_KEY } from '../decorators/Authorized.decorator';
import { omitProperties } from '../utils/object';
import { Role } from '../enums/role.enum';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthorizedGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let noPermission = false;
    const reflector = this.reflector.getAllAndOverride<[boolean, Role[]]>(
      AUTHORIZED_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (reflector) {
      const [shouldValidate, roles] = reflector;
      if (shouldValidate) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const token = extractTokenFromHeader(request);
        if (!token) {
          throw new UnauthorizedException();
        }
        try {
          const user = await this.jwtService.verifyAsync(token, {
            publicKey: this.configService.get<string>(
              'ACCESS_SECRET_PUBLIC_KEY',
            ),
            algorithms: ['RS256'],
          });
          // 💡 We're assigning the payload to the request object here
          // so that we can access it in our route handlers
          request['user'] = omitProperties(user, ['password']);
          // 💡 Check requires roles to perform request
          if (roles.length && !checkPermission(user, roles)) {
            noPermission = true;
          }
        } catch {
          try {
            // Token verification failed, try refreshing the token
            if (!request.headers['x-refresh-token']) {
              throw new UnauthorizedException();
            }
            const payload = await this.jwtService.verifyAsync(
              request.headers['x-refresh-token'],
              {
                publicKey: this.configService.get<string>(
                  'REFRESH_SECRET_PUBLIC_KEY',
                ),
                algorithms: ['RS256'],
              },
            );
            if (!payload) {
              throw new UnauthorizedException();
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const user = await this.authService.getUser(payload.email);
            const {
              tokens: { access, refresh },
            } = await this.authService.generateJWTData(user);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            // 💡 Tokens refreshed: Attach the new tokens to the current request and response
            request['user'] = omitProperties(user, ['password']);
            request.headers['authorization'] = `Bearer ${access}`;
            request.headers['x-refresh-token'] = refresh;
            response.setHeader('authorization', `Bearer ${access}`);
            response.setHeader('x-refresh-token', refresh);
          } catch {
            throw new UnauthorizedException();
          }
        }
      }
      if (noPermission) {
        throw new ForbiddenException();
      }
      return true;
    }
    return true;
  }
}

export function extractTokenFromHeader(request: Request): string | undefined {
  const [type, token] =
    (request.headers['authorization'] as string)?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
}

function checkPermission(user: User, roles: Role[]) {
  return roles.some((role) => user?.role === role);
}
