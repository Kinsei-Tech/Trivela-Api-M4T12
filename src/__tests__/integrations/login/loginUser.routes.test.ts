import request from 'supertest';
import app from '../../../app';
import { DataSource } from 'typeorm';
import AppDataSource from '../../../data-source';
import {
  mokedUser,
  mockedCorrectLogin,
  mockedIncorrectEmailLogin,
  mockedIncorrectPasswordLogin,
} from '../../mocks/login/index';
import { mockedcreateOwner, mockedOwnerLogin } from '../../mocks/fields';
import {
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
    await request(app).post('/users/create').send(mokedUser);
  });
  afterAll(async () => {
    await connection.destroy();
  });
  test('POST /users/login -> Must be able to login and receive a token', async () => {
    const resultLogin = await request(app)
      .post('/users/login')
      .send(mockedCorrectLogin);
    expect(resultLogin.status).toBe(200);
    expect(resultLogin.body).toHaveProperty('token');
  });
  test('POST /users/login -> Should return an error if the email is invalid', async () => {
    const resultLogin = await request(app)
      .post('/users/login')
      .send(mockedIncorrectEmailLogin);
    expect(resultLogin.body).toHaveProperty('message');
    expect(resultLogin.status).toBe(403);
  });
  test('POST /users/login -> Should return an error if the password is invalid', async () => {
    const resultLogin = await request(app)
      .post('/users/login')
      .send(mockedIncorrectPasswordLogin);
    expect(resultLogin.body).toHaveProperty('message');
    expect(resultLogin.status).toBe(403);
  });

  test('POST /owners/login -> Must be able to login and receive a token', async () => {
    await request(app).post('/owners').send(mockedcreateOwner);
    const resultLogin = await request(app)
      .post('/owners/login')
      .send(mockedOwnerLogin);
    console.log(resultLogin.body);
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
