import { Test, TestingModule } from '@nestjs/testing';

import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { newPlayer, players } from './__mocks__/players.mock';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { findBy, findAllBy } from '../core/utils/array';

describe('PlayersController', () => {
  let playersController: PlayersController;
  let playersService: PlayersService;

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
            getAllByClub: jest
              .fn()
              .mockImplementation((club: string) =>
                Promise.resolve(findAllBy(players, 'club', club)),
              ),
            getById: jest
              .fn()
              .mockImplementation((id: string) =>
                Promise.resolve(findBy(players, 'id', id)),
              ),
            updateById: jest.fn().mockImplementation((dto: UpdatePlayerDto) => {
              return Promise.resolve({
                ...findBy(players, 'id', dto.id),
                ...dto,
              });
            }),
            deleteById: jest
              .fn()
              .mockImplementation((id: string) =>
                Promise.resolve(findBy(players, 'id', id)),
              ),
          },
        },
      ],
    }).compile();

    playersController = module.get<PlayersController>(PlayersController);
    playersService = module.get<PlayersService>(PlayersService);
  });

  it('should be defined', () => {
    expect(playersController).toBeDefined();
  });

  describe('create method: ', () => {
    it('should add new player', async () => {
      const dto: CreatePlayerDto = newPlayer;

      const result = await playersController.create(dto);

      expect(playersService.create).toHaveBeenCalled();
      expect(result).toEqual(dto);
    });
  });

  describe('getAll method:', () => {
    it('should return players list', async () => {
      const result = await playersController.getAll();

      expect(playersService.getAll).toHaveBeenCalled();
      expect(result).toBe(players);
    });
  });

  describe('getAllByClub method:', () => {
    it('should return players list by club name', async () => {
      const club = 'Manchester United';
      const result = await playersController.getAllByClub(club);

      expect(playersService.getAllByClub).toHaveBeenCalled();
      expect(result).toEqual(findAllBy(players, 'club', club));
    });
  });

  describe('getById method: ', () => {
    it('should return player data', async () => {
      const result = await playersController.getById(players[0].id);

      expect(playersService.getById).toHaveBeenCalled();
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

      expect(playersService.updateById).toHaveBeenCalledWith(dto);
      expect(result).toEqual({
        ...players['d630b1cc-efb1-45e3-9f92-ae9d2d25a1c6'],
        ...dto,
      });
    });
  });

  describe('deleteById method: ', () => {
    it('should delete player', async () => {
      await playersController.deleteById('id');

      expect(playersService.deleteById).toHaveBeenCalled();
    });
  });
});
