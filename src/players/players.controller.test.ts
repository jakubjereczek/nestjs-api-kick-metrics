import { Test, TestingModule } from '@nestjs/testing';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { Player } from '../core/entities/player.entity';

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
      const result: Player[] = [
        {
          id: 'd630b1cc-efb1-45e3-9f92-ae9d2d25a1c5',
          name: 'Cristiano Ronaldo',
          age: 38,
          nationality: 'Portuguese',
          club: 'Manchester United',
          position: 'Forward',
          statistics: {
            appearances: 25,
            goals: 18,
            assists: 6,
            yellow_cards: 2,
            red_cards: 0,
            passes_completed: 320,
            passes_attempted: 380,
            pass_accuracy: 84.21,
            shots_on_target: 45,
            shot_accuracy: 60.0,
            dribbles_completed: 40,
            dribbles_attempted: 60,
            dribble_success_rate: 66.67,
            tackles_won: 15,
            interceptions: 10,
            fouls_committed: 8,
            fouls_suffered: 12,
            id: 0,
            player: this,
          },
        },
      ];
      jest
        .spyOn(playersService, 'getAll')
        .mockImplementation(async () => result);
      expect(await playersController.getAll()).toBe(result);
    });
  });
});
