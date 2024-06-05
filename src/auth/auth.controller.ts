import { ServerResponse } from 'http';
import { Body, Controller, Get, Post, Request, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Unauthorized } from '../core/decorators/unauthorized.decorator';
import { Authorized } from '../core/decorators/Authorized.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Unauthorized()
  @Post('login')
  signIn(
    @Body() dto: LoginUserDto,
    @Res({ passthrough: true }) response: ServerResponse,
  ) {
    return this.authService.signIn(dto, response);
  }

  @Unauthorized()
  @Post('register')
  register(
    @Body() dto: RegisterUserDto,
    @Res({ passthrough: true }) response: ServerResponse,
  ) {
    return this.authService.register(dto, response);
  }

  @Authorized()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
