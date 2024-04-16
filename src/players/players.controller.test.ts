import { Test, TestingModule } from '@nestjs/testing';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { players } from './__mocks__/players.mock';

describe('PlayersController', () => {
  let playersController: PlayersController;
  let playersService: PlayersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayersController],
      providers: [PlayersService],
    }).compile();

    playersController = module.get<PlayersController>(PlayersController);
    playersService = module.get<PlayersService>(PlayersService);
  });

  it('should be defined', () => {
    expect(playersController).toBeDefined();
  });

  describe('getAll method:', () => {
    it('should return an array with valid data', async () => {
      jest
        .spyOn(playersService, 'getAll')
        .mockImplementation(async () => players);
      expect(await playersController.getAll()).toBe(players);
    });
  });

  it('getById method: ', async () => {
    const playerId = 'd630b1cc-efb1-45e3-9f92-ae9d2d25a1c6';
    const player = players.find(
      (player) => player.id === 'd630b1cc-efb1-45e3-9f92-ae9d2d25a1c6',
    );
    jest
      .spyOn(playersService, 'getById')
      .mockImplementation(async () => player);

    expect(await playersController.findOne(playerId)).toBe(player);
  });

  it('updateById method: ', () => {});

  it('deleteById method: ', () => {});
});
