import request from 'supertest';
import app from '../../../app';
import { DataSource } from 'typeorm';
import AppDataSource from '../../../data-source';
import { ILogin } from '../../../interface/login';
import {
  mockedOwnerLogin,
  mockedOwnerRequest,
  mockedOwnerLoginIncorrectEmail,
  mockedOwnerLoginIncorrectPasswoord,
} from '../../mocks/owners';

describe('/login', () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((error) => {
        console.log('Error during Data Source initialization', error);
      });
    await request(app).post('/owners').send(mockedOwnerRequest);
  });
  afterAll(async () => {
    await connection.destroy();
  });

  test('POST /owners/login -> Must be able to login and receive a token', async () => {
    const resultLogin = await request(app)
      .post('/owners/login')
      .send(mockedOwnerLogin);
    expect(resultLogin.status).toBe(200);
    expect(resultLogin.body).toHaveProperty('token');
  });

  test('POST /owners/login -> Should return an error if the email is invalid', async () => {
    const resultLogin = await request(app)
      .post('/owners/login')
      .send(mockedOwnerLoginIncorrectEmail);
    expect(resultLogin.body).toHaveProperty('message');
    expect(resultLogin.status).toBe(403);
  });

  test('POST /owners/login -> Should return an error if the password is invalid', async () => {
    const resultLogin = await request(app)
      .post('/owners/login')
      .send(mockedOwnerLoginIncorrectPasswoord);
    expect(resultLogin.body).toHaveProperty('message');
    expect(resultLogin.status).toBe(403);
  });
});
