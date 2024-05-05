import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PlayerStatisticsDto {
  @IsInt()
  @ApiProperty({ description: 'The number of appearances made by the player' })
  readonly appearances: number;

  @IsInt()
  @ApiProperty({ description: 'Total goals scored by the player' })
  readonly goals: number;

  @IsInt()
  @ApiProperty({ description: 'Total assists made by the player' })
  readonly assists: number;

  @IsInt()
  @ApiProperty({ description: 'Number of yellow cards received by the player' })
  readonly yellow_cards: number;

  @IsInt()
  @ApiProperty({ description: 'Number of red cards received by the player' })
  readonly red_cards: number;

  @IsInt()
  @ApiProperty({
    description: 'Number of passes successfully completed by the player',
  })
  readonly passes_completed: number;

  @IsInt()
  @ApiProperty({
    description: 'Total number of passes attempted by the player',
  })
  readonly passes_attempted: number;

  @IsInt()
  @ApiProperty({
    description: 'Percentage of passes that were accurately completed',
  })
  readonly pass_accuracy: number;

  @IsInt()
  @ApiProperty({ description: 'Total number of shots that were on target' })
  readonly shots_on_target: number;

  @IsInt()
  @ApiProperty({ description: 'Percentage of shots that were on target' })
  readonly shot_accuracy: number;

  @IsInt()
  @ApiProperty({
    description: 'Number of successful dribbles made by the player',
  })
  readonly dribbles_completed: number;

  @IsInt()
  @ApiProperty({
    description: 'Total number of dribbles attempted by the player',
  })
  readonly dribbles_attempted: number;

  @IsInt()
  @ApiProperty({ description: 'Percentage of dribbles successfully completed' })
  readonly dribble_success_rate: number;

  @IsInt()
  @ApiProperty({ description: 'Number of tackles won by the player' })
  readonly tackles_won: number;

  @IsInt()
  @ApiProperty({ description: 'Number of interceptions made by the player' })
  readonly interceptions: number;

  @IsInt()
  @ApiProperty({ description: 'Number of fouls committed by the player' })
  readonly fouls_committed: number;

  @IsInt()
  @ApiProperty({ description: 'Number of fouls suffered by the player' })
  readonly fouls_suffered: number;
}
