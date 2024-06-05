import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UNAUTHORIZED_KEY_KEY } from '../decorators/unauthorized.decorator';

@Injectable()
export class UnauthorizedGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const unauthorized = this.reflector.get<boolean>(
      UNAUTHORIZED_KEY_KEY,
      context.getHandler(),
    );
    if (unauthorized) {
      const { user } = context.switchToHttp().getRequest();
      if (user) {
        return false;
      }
      return true;
    }
    return true;
  }
}
