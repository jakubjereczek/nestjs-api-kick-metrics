import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { uuid } from 'uuidv4';
import { Injectable } from '@nestjs/common';
import { Player } from '../core/entities/player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import getNewStatistics from './utils/get-new-statistics.util';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
  ) {}

  public create(player: CreatePlayerDto) {
    return this.playersRepository.create({
      id: uuid(),
      ...player,
      ...(!player.statistics && { statistics: getNewStatistics() }),
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

  public updateById({ id, ...player }: UpdatePlayerDto) {
    return this.playersRepository.update({ id }, player);
  }

  public deleteById(id: string) {
    return this.playersRepository.delete({ id });
  }
}
