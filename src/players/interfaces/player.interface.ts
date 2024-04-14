export interface Player {
  id: string;
  name: string;
  age: number;
  nationality: string;
  club: string;
  position: string;
  statistics: PlayerStatistics;
}

export interface PlayerStatistics {
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
}
