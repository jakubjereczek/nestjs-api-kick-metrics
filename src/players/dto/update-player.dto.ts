import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsString, IsOptional } from 'class-validator';
import { PlayerStatisticsDto } from './player-statistics.dto';

export class UpdatePlayerDto {
  @IsString()
  @ApiProperty({
    description: 'ID (uuid v4) of the player',
  })
  readonly id: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly name: string;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  readonly age: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly nationality: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly club: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly position: string;

  @IsOptional()
  @ApiPropertyOptional()
  readonly statistics: PlayerStatisticsDto;
}
