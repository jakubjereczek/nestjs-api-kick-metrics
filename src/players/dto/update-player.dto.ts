import { IsInt, IsString, IsOptional } from 'class-validator';

export class UpdatePlayerDto {
  @IsString()
  readonly id: string;

  @IsString()
  @IsOptional()
  readonly name: string;

  @IsInt()
  @IsOptional()
  readonly age: number;

  @IsString()
  @IsOptional()
  readonly nationality: string;

  @IsString()
  @IsOptional()
  readonly club: string;

  @IsString()
  @IsOptional()
  readonly position: string;

  @IsOptional()
  readonly statistics: {
    appearances: number;
    goals: number;
    assists: number;
    yellow_cards: number;
    red_cards: number;
    passes_completed: number;
    passes_attempted: number;
    pass_accuracy: number;
    shots_on_target: number;
    shot_accuracy: number;
    dribbles_completed: number;
    dribbles_attempted: number;
    dribble_success_rate: number;
    tackles_won: number;
    interceptions: number;
    fouls_committed: number;
    fouls_suffered: number;
  };
}
