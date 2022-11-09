import request from 'supertest';
import { DataSource } from 'typeorm';
import app from '../../../app';
import AppDataSource from '../../../data-source';
import { mockedCorrectLogin, mokedUser } from '../../mocks/login';
import { mockedTeam0, mockedTeam1 } from '../../mocks/teams';

describe('/teams', () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((error) => {
        console.log('Error during Data Source initialization', error);
      });

    await request(app).post('/users/create').send(mokedUser);
  });
  afterAll(async () => {
    await connection.destroy();
  });

  test('POST /teams - should be able to create a team with auth', async () => {
    const resultLogin = await request(app)
      .post('/users/login')
      .send(mockedCorrectLogin);

    const response = await request(app)
      .post('/teams/create')
      .set('Authorization', `Bearer ${resultLogin.body.token}`)
      .send(mockedTeam0);

    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('team');
    expect(response.body.team).toHaveProperty('id');
    expect(response.body.team).toHaveProperty('name');
    expect(response.body.team).toHaveProperty('description');
    expect(response.body.team).toHaveProperty('state');
    expect(response.body.team).toHaveProperty('city');
    expect(response.body.team).toHaveProperty('positions');
  });

  test('POST /teams - should not be able to create a team without auth', async () => {
    const response = await request(app).post('/teams/create').send(mockedTeam1);
    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('GET /teams - should be able to list all teams with auth', async () => {
    const resultLogin = await request(app)
      .post('/users/login')
      .send(mockedCorrectLogin);
    const response = await request(app)
      .get('/teams')
      .set('Authorization', `Bearer ${resultLogin.body.token}`);
    expect(response.body).toHaveLength(1);
  });

  test('GET /teams - should not be able to list teams without auth', async () => {
    const response = await request(app)
      .get('/teams')
      .set('Authorization', `Bearer`);
    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test("GET /teams:id should be able to show a team receiving only it's id", async () => {
    const resultLogin = await request(app)
      .post('/users/login')
      .send(mockedCorrectLogin);
    const responseAllTeams = await request(app)
      .get('/teams')
      .set('Authorization', `Bearer ${resultLogin.body.token}`);

    const response = await request(app)
      .get(`/teams/${responseAllTeams.body[0].id}`)
      .set('Authorization', `Bearer ${resultLogin.body.token}`);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('state');
    expect(response.body).toHaveProperty('city');
    expect(response.body).toHaveProperty('participants');
    expect(response.body).toHaveProperty('fields');
    expect(response.body).toHaveProperty('positions');
    expect(response.status).toBe(200);
  });

  test('GET /teams/:id should not be able to show a team without auth', async () => {
    const createTeam = await request(app)
      .post('/teams/create')
      .send(mockedTeam1);
    const response = await request(app).get(`/users/${createTeam.body.id}`);
    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });
});
