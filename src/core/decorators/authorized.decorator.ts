import { SetMetadata } from '@nestjs/common';

export const AUTHORIZED_KEY = 'Authorized';
export const Authorized = () => SetMetadata(AUTHORIZED_KEY, true);
