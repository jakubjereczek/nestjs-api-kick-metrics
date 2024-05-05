import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { Player } from '../core/entities/player.entity';
import { PlayerStatistics } from '../core/entities/player-statistics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player, PlayerStatistics])],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
