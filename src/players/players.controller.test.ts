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
            getByParams: jest.fn().mockImplementation(({ id, club }: any) => {
              return findAllBy(players, {
                ...(id && { id }),
                ...(club && { club }),
              });
            }),
            updateById: jest
              .fn()
              .mockImplementation((id: string, dto: UpdatePlayerDto) => {
                return Promise.resolve({
                  ...findBy(players, 'id', id),
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

  describe('getPlayers method:', () => {
    it('should return players list', async () => {
      const result = await playersController.getPlayers(undefined, undefined);

      expect(playersService.getAll).toHaveBeenCalled();
      expect(result).toBe(players);
    });

    it('should return players list by club name', async () => {
      const club = 'Manchester United';
      const result = await playersController.getPlayers(club, undefined);

      expect(playersService.getByParams).toHaveBeenCalled();
      expect(result).toEqual(findAllBy(players, { club }));
    });

    it('should return player by id', async () => {
      const result = await playersController.getPlayers(
        undefined,
        players[0].id,
      );

      expect(playersService.getByParams).toHaveBeenCalled();
      expect(result).toEqual([players[0]]);
    });
  });

  describe('updateById method: ', () => {
    it('should update player data', async () => {
      const id = 'd630b1cc-efb1-45e3-9f92-ae9d2d25a1c6';
      const dto: UpdatePlayerDto = {
        name: 'Robert Lewandowski',
        born: new Date('1988-08-21'),
        nationality: 'Poland',
        club: 'FC Barcelona',
        position: 'Stricker',
        statistics: undefined,
      };

      const result = await playersController.updateById(id, dto);

      expect(playersService.updateById).toHaveBeenCalledWith(id, dto);
      expect(result).toEqual({
        ...findBy(players, 'id', id),
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
