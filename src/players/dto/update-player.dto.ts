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
  @ApiPropertyOptional({ description: 'The full name of the player' })
  readonly name: string;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional({ description: 'The age of the player in years' })
  readonly age: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'The nationality of the player' })
  readonly nationality: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'The club that the player currently plays for',
  })
  readonly club: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'The playing position of the player on the field',
  })
  readonly position: string;

  @IsOptional()
  @ApiPropertyOptional()
  readonly statistics: PlayerStatisticsDto;
}
