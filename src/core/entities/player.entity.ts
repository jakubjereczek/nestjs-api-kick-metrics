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

  @Column({ type: 'date' })
  born: Date;

  @Column()
  nationality: string;

  @Column()
  club: string;

  @Column()
  position: string;

  @OneToOne(() => PlayerStatistics, (stats) => stats.player, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  statistics: PlayerStatistics;
}
