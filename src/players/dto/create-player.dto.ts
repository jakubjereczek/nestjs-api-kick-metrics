import { IsInt, IsString } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  readonly name: string;

  @IsInt()
  readonly age: number;

  @IsString()
  readonly nationality: string;

  @IsString()
  readonly club: string;

  @IsString()
  readonly position: string;
}
