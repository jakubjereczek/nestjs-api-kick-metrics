import { PlayerStatistics } from 'src/core/entities/player-statistics.entity';

export default function getNewStatistics(): PlayerStatistics {
  return {
    appearances: 0,
    goals: 0,
    assists: 0,
    yellow_cards: 0,
    red_cards: 0,
    passes_completed: 0,
    passes_attempted: 0,
    pass_accuracy: 0,
    shots_on_target: 0,
    shot_accuracy: 0,
    dribbles_completed: 0,
    dribbles_attempted: 0,
    dribble_success_rate: 0,
    tackles_won: 0,
    interceptions: 0,
    fouls_committed: 0,
    fouls_suffered: 0,
  } as PlayerStatistics;
}
