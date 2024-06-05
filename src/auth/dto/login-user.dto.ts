import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @ApiProperty({ description: 'The email of the user' })
  readonly email: string;

  @IsString()
  @ApiProperty({ description: 'The password of the user' })
  readonly password: string;
}
