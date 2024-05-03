import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsString, IsOptional } from 'class-validator';
import { PlayerStatisticsDto } from './player-statistics.dto';

export class CreatePlayerDto {
  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsInt()
  @ApiProperty()
  readonly age: number;

  @IsString()
  @ApiProperty()
  readonly nationality: string;

  @IsString()
  @ApiProperty()
  readonly club: string;

  @IsString()
  @ApiProperty()
  readonly position: string;

  @IsOptional()
  @ApiPropertyOptional()
  readonly statistics: PlayerStatisticsDto;
}
