import { Module } from '@nestjs/common';
import { PlayersModule } from './players.module';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';

@Module({
  imports: [PlayersModule],
  providers: [PlayersService],
  controllers: [PlayersController],
})
export class UserHttpModule {}
