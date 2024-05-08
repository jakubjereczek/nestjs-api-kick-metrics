import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate } from 'class-validator';
import { PlayerStatisticsDto } from './player-statistics.dto';

export class UpdatePlayerDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'The full name of the player' })
  readonly name: string;

  @IsDate()
  @IsOptional()
  @ApiPropertyOptional({ description: 'The born date of the player' })
  readonly born: Date;

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
