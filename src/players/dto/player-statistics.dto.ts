import { ApiProperty } from '@nestjs/swagger';

export class PlayerStatisticsDto {
  @ApiProperty()
  readonly appearances: number;

  @ApiProperty()
  readonly goals: number;

  @ApiProperty()
  readonly assists: number;

  @ApiProperty()
  readonly yellow_cards: number;

  @ApiProperty()
  readonly red_cards: number;

  @ApiProperty()
  readonly passes_completed: number;

  @ApiProperty()
  readonly passes_attempted: number;

  @ApiProperty()
  readonly pass_accuracy: number;

  @ApiProperty()
  readonly shots_on_target: number;

  @ApiProperty()
  readonly shot_accuracy: number;

  @ApiProperty()
  readonly dribbles_completed: number;

  @ApiProperty()
  readonly dribbles_attempted: number;

  @ApiProperty()
  readonly dribble_success_rate: number;

  @ApiProperty()
  readonly tackles_won: number;

  @ApiProperty()
  readonly interceptions: number;

  @ApiProperty()
  readonly fouls_committed: number;

  @ApiProperty()
  readonly fouls_suffered: number;
}
