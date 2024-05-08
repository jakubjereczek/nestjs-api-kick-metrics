import { InjectRepository } from '@nestjs/typeorm';
import * as deepmerge from 'deepmerge';

import { Repository } from 'typeorm';
import { uuid } from 'uuidv4';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Player } from '../core/entities/player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayerStatistics } from '../core//entities/player-statistics.entity';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playersRepository: Repository<Player>,
    @InjectRepository(PlayerStatistics)
    private _statisticsRepository: Repository<PlayerStatistics>,
  ) {}

  public create(dto: CreatePlayerDto) {
    return this.playersRepository.save({
      id: uuid(),
      ...dto,
      ...(!dto.statistics && {
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

  private async getById(id: string) {
    return await this.playersRepository.findOne({
      where: {
        id,
      },
      relations: {
        statistics: true,
      },
    });
  }

  public async getAll() {
    try {
      return await this.playersRepository.find({
        relations: {
          statistics: true,
        },
      });
    } catch (error) {
      console.error('Failed to get player list', error);

      throw new HttpException(
        'A generic server error occurred.',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  public async getByParams({
    id,
    club,
  }: {
    id: string | undefined;
    club: string | undefined;
  }) {
    try {
      return await this.playersRepository.find({
        where: {
          id,
          club,
        },
        relations: {
          statistics: true,
        },
      });
    } catch (error) {
      console.error('Failed to get player by params.', error);

      throw new HttpException(
        'A generic server error occurred.',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  public async updateById(id: string, dto: UpdatePlayerDto) {
    try {
      const player = await this.getById(id);
      if (!player) {
        throw new HttpException(
          'The record with the given id was not found.',
          HttpStatus.NOT_FOUND,
        );
      }
      return (await this.playersRepository.save(
        deepmerge(player, dto),
      )) as Player;
    } catch (error) {
      console.error('Failed to update player.', error);

      throw new HttpException(
        'A generic server error occurred.',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
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
      console.error('Failed to delete player.', error);

      throw new HttpException(
        'A generic server error occurred.',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }
}
