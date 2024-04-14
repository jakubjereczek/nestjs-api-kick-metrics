import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from 'src/core/entities/player.entity';
import { PlayerStatistics } from 'src/core/entities/player-statistics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player, PlayerStatistics])],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
