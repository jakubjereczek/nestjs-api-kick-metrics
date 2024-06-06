import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { newPlayer } from '../src/players/__mocks__/players.mock';

describe('Players (e2e)', () => {
  let app: INestApplication;
  let uuid: number | undefined;
  let token: string | undefined;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeAll(() => {
    uuid = undefined;
    token = undefined;
  });

  it('authorize to intercept token', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'admin@gmail.com',
        password: '123457',
      })
      .expect(200)
      .expect((response) => {
        token = response.headers['authorization'];
      });
  });

  it('/players (POST)', () => {
    return request(app.getHttpServer())
      .post('/players')
      .set('authorization', token)
      .send({
        name: 'Lukas Nowak',
        born: new Date('1993-04-15'),
        nationality: 'Czech',
        club: 'Borussia Dortmund',
        position: 'Defender',
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
      })
      .expect(201)
      .expect((response) => {
        uuid = response.body.id;
        expect(response.body).toMatchObject({
          ...newPlayer,
          born: '1993-04-15T00:00:00.000Z',
          id: uuid,
        });
      });
  });

  it('/players (GET)', () => {
    return request(app.getHttpServer()).get('/players').expect(200);
  });

  it(`players?id={uuid}&club={club} (GET)`, () => {
    return request(app.getHttpServer())
      .get(`/players?id=${uuid}&club=${newPlayer.club}`)
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toMatchObject({
          ...newPlayer,
          born: '1993-04-15',
          id: uuid,
        });
      });
  });

  it('players/${uuid} (PUT)', () => {
    return request(app.getHttpServer())
      .put(`/players/${uuid}`)
      .set('authorization', token)
      .send({
        name: 'Jadon Sancho',
        born: new Date('2000-03-12'),
        nationality: 'United Kingdom',
        position: 'Forward',
        statistics: {
          appearances: 21,
          goals: 3,
        },
      })
      .expect(200)
      .expect((response) => {
        expect(response.body).toMatchObject({
          id: uuid,
          name: 'Jadon Sancho',
          born: '2000-03-12T00:00:00.000Z',
          nationality: 'United Kingdom',
          club: 'Borussia Dortmund',
          position: 'Forward',
          statistics: {
            appearances: 21,
            goals: 3,
            assists: 8,
            yellow_cards: 3,
            red_cards: 1,
            passes_completed: 400,
            passes_attempted: 480,
            pass_accuracy: 83.33,
            shots_on_target: 20,
            shot_accuracy: 50,
            dribbles_completed: 25,
            dribbles_attempted: 40,
            dribble_success_rate: 62.5,
            tackles_won: 20,
            interceptions: 15,
            fouls_committed: 10,
            fouls_suffered: 18,
          },
        });
      });
  });

  it(`players/{uuid} (DELETE)`, () => {
    return request(app.getHttpServer())
      .delete(`/players/${uuid}`)
      .set('authorization', token)
      .expect(200);
  });
});

// test roles
