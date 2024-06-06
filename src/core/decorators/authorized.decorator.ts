import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';

export const AUTHORIZED_KEY = 'Authorized';
export const Authorized = (roles: Role[] = []) =>
  SetMetadata(AUTHORIZED_KEY, [true, roles]);
