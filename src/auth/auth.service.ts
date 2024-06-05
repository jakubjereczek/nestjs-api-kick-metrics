import * as bcrypt from 'bcrypt';
import { ServerResponse } from 'http';
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { uuid } from 'uuidv4';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { omitProperties } from '../core/utils/object';
import { UsersService } from '../users/users.service';
import { User } from '../core/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async getUser(email: string) {
    return await this.usersService.findUser(email);
  }

  async signIn(dto: LoginUserDto, response: ServerResponse) {
    const user = await this.usersService.findUser(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (!(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    try {
      const {
        tokens: { access, refresh },
      } = await this.generateJWTData(user);

      response.setHeader('authorization', `Bearer ${access}`);
      response.setHeader('x-refresh-token', refresh);
      response.statusCode = 200;
      return omitProperties(user, ['password']);
    } catch (error) {
      console.error('Failed to authorize user', error);

      throw new HttpException(
        'A generic server error occurred.',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  async register(dto: RegisterUserDto, response: ServerResponse) {
    const user = await this.usersService.findUser(dto.email);
    if (user) {
      throw new ConflictException('User already exists.');
    }

    try {
      const user = await this.usersRepository.save({
        ...dto,
        id: uuid(),
        password: await bcrypt.hash(dto.password, await bcrypt.genSalt(10)),
      });

      const {
        tokens: { access, refresh },
      } = await this.generateJWTData(user);

      // Alternative: http-only cookie
      response.setHeader('authorization', `Bearer ${access}`);
      response.setHeader('x-refresh-token', refresh);
      return omitProperties(user, ['password']);
    } catch (error) {
      console.error('Failed to add user');

      throw new HttpException(
        'A generic server error occurred.',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  async generateJWTData(user: User) {
    return {
      user,
      tokens: {
        access: await this.generateJWT(
          user,
          '15m',
          this.configService.get<string>('ACCESS_SECRET_PRIVATE_KEY'),
        ),
        refresh: await this.generateJWT(
          user,
          '7d',
          this.configService.get<string>('REFRESH_SECRET_PRIVATE_KEY'),
        ),
      },
    };
  }

  private async generateJWT(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { password, ...user }: User,
    expiresIn: string,
    key: string,
  ) {
    return await this.jwtService.signAsync(user, {
      expiresIn,
      privateKey: key,
      // RSASSA using SHA-256 hash algorithm
      algorithm: 'RS256',
    });
  }
}
