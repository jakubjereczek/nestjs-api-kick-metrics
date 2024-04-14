import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { uuid } from 'uuidv4';
import { Injectable } from '@nestjs/common';
import { Player } from '../core/entities/player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
  ) {}
  public create(player: CreatePlayerDto) {
    this.playersRepository.create({
      id: uuid(),
      ...player,
      statistics: {
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
      },
    });
  }

  public getById(id: string) {
    return this.playersRepository.findOne({
      where: {
        id,
      },
    });
  }

  public getAll() {
    return this.playersRepository.find();
  }
}
