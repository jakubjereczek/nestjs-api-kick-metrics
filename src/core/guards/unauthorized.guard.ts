import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ConflictException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { UNAUTHORIZED_KEY_KEY } from '../decorators/unauthorized.decorator';
import { extractTokenFromHeader } from './authorized.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UnauthorizedGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const unauthorized = this.reflector.get<boolean>(
      UNAUTHORIZED_KEY_KEY,
      context.getHandler(),
    );
    if (unauthorized) {
      const request = context.switchToHttp().getRequest();
      const token = extractTokenFromHeader(request);
      if (token) {
        let result = false;
        try {
          await this.jwtService.verifyAsync(token, {
            publicKey: this.configService.get<string>(
              'ACCESS_SECRET_PUBLIC_KEY',
            ),
            algorithms: ['RS256'],
          });
          result = true;
        } catch {
          result = false;
        } finally {
          if (result) {
            // 💡 The token is valid, do not allow to perform the request.
            throw new ConflictException();
          }
        }
      }
    }
    return true;
  }
}
