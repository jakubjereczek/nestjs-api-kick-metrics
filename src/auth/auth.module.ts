import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../core/entities/user.entity';
import { AuthorizedGuard } from '../core/guards/authorized.guard';
import { RolesGuard } from '../core/guards/roles.guard';
import { UnauthorizedGuard } from '../core/guards/unauthorized.guard';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, JwtModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthorizedGuard,
    },
    {
      provide: APP_GUARD,
      useClass: UnauthorizedGuard,
    },
  ],
})
export class AuthModule {}
