import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { PlayerStatistics } from './player-statistics.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  nationality: string;

  @Column()
  club: string;

  @Column()
  position: string;

  @OneToOne(() => PlayerStatistics, (stats) => stats.player, { cascade: true })
  @JoinColumn()
  statistics: PlayerStatistics;
}
