import { Test, TestingModule } from '@nestjs/testing';

import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { players } from './__mocks__/players.mock';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { findById } from '../core/utils/array';

describe('PlayersController', () => {
  let playersController: PlayersController;
  let playersService2: PlayersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayersController],
      providers: [
        PlayersService,
        {
          provide: PlayersService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((dto: CreatePlayerDto) =>
                Promise.resolve(dto),
              ),
            getAll: jest.fn().mockResolvedValue(players),
            getById: jest
              .fn()
              .mockImplementation((id: string) =>
                Promise.resolve(findById(players, id)),
              ),
            updateById: jest.fn().mockImplementation((dto: UpdatePlayerDto) => {
              return Promise.resolve({
                ...findById(players, dto.id),
                ...dto,
              });
            }),
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            deleteById: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                raw: '', // raw SQL result returned by executed query
                affected: null, // number of affected rows/documents
              }),
            ),
          },
        },
      ],
    }).compile();

    playersController = module.get<PlayersController>(PlayersController);
    playersService2 = module.get<PlayersService>(PlayersService);
  });

  it('should be defined', () => {
    expect(playersController).toBeDefined();
  });

  describe('create method: ', () => {
    it('should add new player', async () => {
      const dto: CreatePlayerDto = {
        name: 'Arkadiusz Szymański',
        age: 27,
        nationality: 'Polish',
        club: 'AC Milan',
        position: 'Midfielder',
        statistics: {
          appearances: 30,
          goals: 10,
          assists: 8,
          yellow_cards: 3,
          red_cards: 1,
          passes_completed: 400,
          passes_attempted: 480,
          pass_accuracy: 83.33,
          shots_on_target: 20,
          shot_accuracy: 50.0,
          dribbles_completed: 25,
          dribbles_attempted: 40,
          dribble_success_rate: 62.5,
          tackles_won: 20,
          interceptions: 15,
          fouls_committed: 10,
          fouls_suffered: 18,
        },
      };

      const result = await playersController.create(dto);

      expect(playersService2.create).toHaveBeenCalled();
      expect(result).toEqual(dto);
    });
  });

  describe('getAll method:', () => {
    it('should return players list', async () => {
      const result = await playersController.getAll();

      expect(playersService2.getAll).toHaveBeenCalled();
      expect(result).toBe(players);
    });
  });

  describe('getById method: ', () => {
    it('should return player data', async () => {
      const result = await playersController.getById(players[0].id);

      expect(playersService2.getById).toHaveBeenCalled();
      expect(result).toEqual(players[0]);
    });
  });

  describe('updateById method: ', () => {
    it('should update player data', async () => {
      const dto: UpdatePlayerDto = {
        id: 'd630b1cc-efb1-45e3-9f92-ae9d2d25a1c6',
        name: 'Robert Lewandowski',
        age: 35,
        nationality: 'Poland',
        club: 'FC Barcelona',
        position: 'Stricker',
        statistics: undefined,
      };

      const result = await playersController.updateById(dto);

      expect(playersService2.updateById).toHaveBeenCalledWith(dto);
      expect(result).toEqual({
        ...players['d630b1cc-efb1-45e3-9f92-ae9d2d25a1c6'],
        ...dto,
      });
    });
  });

  describe('deleteById method: ', () => {
    it('should delete player', async () => {
      await playersController.deleteById('id');

      expect(playersService2.deleteById).toHaveBeenCalled();
    });
  });
});
