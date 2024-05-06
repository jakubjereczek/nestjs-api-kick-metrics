import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { uuid } from 'uuidv4';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Player } from '../core/entities/player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayerStatistics } from 'src/core/entities/player-statistics.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
    @InjectRepository(PlayerStatistics)
    private _statisticsRepository: Repository<PlayerStatistics>,
  ) {}

  public create(player: CreatePlayerDto) {
    return this.playersRepository.save({
      id: uuid(),
      ...player,
      ...(!player.statistics && {
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
      }),
    });
  }

  public getById(id: string) {
    return this.playersRepository.findOne({
      where: {
        id,
      },
      relations: {
        statistics: true,
      },
    });
  }

  public getAll() {
    return this.playersRepository.find({
      relations: {
        statistics: true,
      },
    });
  }

  public getAllByClub(club: string) {
    return this.playersRepository.find({
      where: {
        club,
      },
      relations: {
        statistics: true,
      },
    });
  }

  public updateById({ id, ...player }: UpdatePlayerDto) {
    return this.playersRepository.update({ id }, player);
  }
  public async deleteById(id: string): Promise<Player> {
    try {
      const player = await this.getById(id);
      if (!player) {
        throw new HttpException(
          'The record with the given id was not found.',
          HttpStatus.NOT_FOUND,
        );
      }
      if (player.statistics?.id) {
        const statistics = await this._statisticsRepository.findOne({
          where: { id: player.statistics.id },
        });
        if (statistics) {
          await this._statisticsRepository.remove(statistics);
        }
      }
      return await this.playersRepository.remove(player);
    } catch (error) {
      console.error('Failed to delete player:', error);

      throw new HttpException(
        'A generic server error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }
}
