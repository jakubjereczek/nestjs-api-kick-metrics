import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  @ApiProperty({ description: 'The email of the user' })
  readonly email: string;

  @IsString()
  @MinLength(3)
  @ApiProperty({ description: 'The name of the user' })
  readonly username: string;

  @IsStrongPassword({ minLength: 6, minLowercase: 1, minNumbers: 1 })
  @ApiProperty({ description: 'The password of the user' })
  readonly password: string;
}
