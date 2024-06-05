import { SetMetadata } from '@nestjs/common';

export const UNAUTHORIZED_KEY_KEY = 'Unauthorized';
export const Unauthorized = () => SetMetadata(UNAUTHORIZED_KEY_KEY, true);
