import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Player } from './player.entity';

@Entity()
export class PlayerStatistics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  appearances: number;

  @Column()
  goals: number;

  @Column()
  assists: number;

  @Column()
  yellow_cards: number;

  @Column()
  red_cards: number;

  @Column()
  passes_completed: number;

  @Column()
  passes_attempted: number;

  @Column()
  pass_accuracy: number;

  @Column()
  shots_on_target: number;

  @Column()
  shot_accuracy: number;

  @Column()
  dribbles_completed: number;

  @Column()
  dribbles_attempted: number;

  @Column()
  dribble_success_rate: number;

  @Column()
  tackles_won: number;

  @Column()
  interceptions: number;

  @Column()
  fouls_committed: number;

  @Column()
  fouls_suffered: number;

  @OneToOne(() => Player, (player) => player.statistics)
  player: Player;
}
