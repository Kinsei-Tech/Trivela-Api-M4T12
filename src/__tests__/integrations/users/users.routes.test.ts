import request from 'supertest';
import app from '../../../app';
import { DataSource } from 'typeorm';
import AppDataSource from '../../../data-source';
import { mockedCorrectLogin, mokedUser } from '../../mocks/login';
import {
  mokedUser2,
  mokedUserNewSocialNetwork,
  mokedUserupdateAdress,
  mokedUserUpdatePositions,
  mokedUserUpdateSocialNetwork,
} from '../../mocks/users';

describe('/users', () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((error) => {
        console.log('Error during Data Source initialization', error);
      });
  });
  afterAll(async () => {
    await connection.destroy();
  });

  test('Must be able to create user', async () => {
    const response = await request(app).post('/users/create').send(mokedUser);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('isActive');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
    expect(response.body).toHaveProperty('age');
    expect(response.body).toHaveProperty('height');
    expect(response.body).toHaveProperty('weight');
    expect(response.body).toHaveProperty('telephone');
    expect(response.body).toHaveProperty('isExercising');
    expect(response.body).toHaveProperty('urlImg');
    expect(response.body).toHaveProperty('socialNetwork');
    expect(response.body).toHaveProperty('address');
    expect(response.body).toHaveProperty('positions');
    expect(response.body).toHaveProperty('request');
    expect(response.status).toBe(201);
  });

  test('should not be able to create an already existing user', async () => {
    const response = await request(app).post('/users/create').send(mokedUser);
    expect(response.body).toHaveProperty('status');
    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('should be able to list all users', async () => {
    const resultLogin = await request(app)
      .post('/users/login')
      .send(mockedCorrectLogin);
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${resultLogin.body.token}`);
    expect(response.body).toHaveLength(1);
  });

  test('should not be able to list users without auth', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer`);
    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('should be able to list user with id', async () => {
    const resultLogin = await request(app)
      .post('/users/login')
      .send(mockedCorrectLogin);
    const responseAllUser = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${resultLogin.body.token}`);

    const response = await request(app)
      .get(`/users/${responseAllUser.body[0].id}`)
      .set('Authorization', `Bearer ${resultLogin.body.token}`);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
    expect(response.status).toBe(200);
  });

  test('should not be able to list user with id without auth', async () => {
    const userCreate = await request(app)
      .post('/users/create')
      .send(mokedUser2);
    const response = await request(app).get(`/users/${userCreate.body.id}`);
    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('must be able to create social network', async () => {
    const resultLogin = await request(app)
      .post('/users/login')
      .send(mockedCorrectLogin);
    const responseAllUser = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${resultLogin.body.token}`);
    const response = await request(app)
      .patch(`/users/update/${responseAllUser.body[0].id}`)
      .set('Authorization', `Bearer ${resultLogin.body.token}`)
      .send(mokedUserNewSocialNetwork);

    expect(response.body.socialNetwork).toHaveProperty('facebook');

    expect(response.status).toBe(200); // trocar o status number da requisição
  });
  test('should not be able to create social network without auth', async () => {
    const resultLogin = await request(app)
      .post('/users/login')
      .send(mockedCorrectLogin);
    const responseAllUser = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${resultLogin.body.token}`);
    const response = await request(app)
      .patch(`/users/update/${responseAllUser.body[0].id}`)
      .send(mokedUserNewSocialNetwork);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });
  test('must not be able to create another users social network', async () => {
    const resultLogin = await request(app)
      .post('/users/login')
      .send(mockedCorrectLogin);
    const responseAllUser = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${resultLogin.body.token}`);
    console.log(responseAllUser.body);
    const response = await request(app)
      .patch(`/users/update/${responseAllUser.body[1].id}`)
      .send(mokedUserNewSocialNetwork);
    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });
  test('must be able to update like users social networks', async () => {
    const resultLogin = await request(app)
      .post('/users/login')
      .send(mockedCorrectLogin);
    const responseAllUser = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${resultLogin.body.token}`);
    const response = await request(app)
      .patch(`/users/update/${responseAllUser.body[0].id}`)
      .set('Authorization', `Bearer ${resultLogin.body.token}`)
      .send(mokedUserUpdateSocialNetwork);

    expect(response.body.socialNetwork).toHaveProperty('facebook');

    expect(response.status).toBe(200); // trocar o status number da requisição
  });
  test('must be able to update soccer positions', async () => {
    const resultLogin = await request(app)
      .post('/users/login')
      .send(mockedCorrectLogin);
    const responseAllUser = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${resultLogin.body.token}`);
    const response = await request(app)
      .patch(`/users/update/${responseAllUser.body[0].id}`)
      .set('Authorization', `Bearer ${resultLogin.body.token}`)
      .send(mokedUserUpdatePositions);
    expect(response.body.positions.target).toBe(true);
    expect(response.body.positions.goalkeeper).toBe(true);
    expect(response.body.positions.leftwing).toBe(false);
    expect(response.body.positions.rightwing).toBe(false);
    expect(response.body.positions.fixed).toBe(false);
    expect(response.status).toBe(200); // trocar o status number da requisição
  });

  test('should not be able to update another user positions', async () => {
    const resultLogin = await request(app)
      .post('/users/login')
      .send(mockedCorrectLogin);
    const responseAllUser = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${resultLogin.body.token}`);
    const response = await request(app)
      .patch(`/users/update/${responseAllUser.body[1].id}`)
      .set('Authorization', `Bearer ${resultLogin.body.token}`)
      .send(mokedUserUpdatePositions);
    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test('shouldnt be able to update positions without auth', async () => {
    const resultLogin = await request(app)
      .post('/users/login')
      .send(mockedCorrectLogin);
    const responseAllUser = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${resultLogin.body.token}`);
    const response = await request(app)
      .patch(`/users/update/${responseAllUser.body[0].id}`)
      .send(mokedUserUpdatePositions);
    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('should be able to change the address', async () => {
    const resultLogin = await request(app)
      .post('/users/login')
      .send(mockedCorrectLogin);
    const responseAllUser = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${resultLogin.body.token}`);
    const response = await request(app)
      .patch(`/users/update/${responseAllUser.body[0].id}`)
      .set('Authorization', `Bearer ${resultLogin.body.token}`)
      .send(mokedUserupdateAdress);
    expect(response.body.address.street).toBe('esquina com meia');
    expect(response.body.address.district).toBe('Hueco');
    expect(response.body.address.zipCode).toBe('10948340');
    expect(response.body.address.number).toBe('66');
    expect(response.body.address.complement).toBe('vazio');
    expect(response.body.address.city).toBe('Hueco');
    expect(response.body.address.state).toBe('Mundo');
    expect(response.status).toBe(200);
  });

  test('should not be able to update another user adress', async () => {
    const resultLogin = await request(app)
      .post('/users/login')
      .send(mockedCorrectLogin);
    const responseAllUser = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${resultLogin.body.token}`);
    const response = await request(app)
      .patch(`/users/update/${responseAllUser.body[1].id}`)
      .set('Authorization', `Bearer ${resultLogin.body.token}`)
      .send(mokedUserupdateAdress);
    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test('should not be able to disable another user', async () => {
    const resultLogin = await request(app)
      .post('/users/login')
      .send(mockedCorrectLogin);
    const responseAllUser = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${resultLogin.body.token}`);
    const response = await request(app)
      .delete(`/users/desactive/${responseAllUser.body[1].id}`)
      .set('Authorization', `Bearer ${resultLogin.body.token}`);
    expect(response.status).toBe(404);
  });

  test('should not be able to disable user without auth', async () => {
    const resultLogin = await request(app)
      .post('/users/login')
      .send(mockedCorrectLogin);
    const responseAllUser = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${resultLogin.body.token}`);
    const response = await request(app).delete(
      `/users/desactive/${responseAllUser.body[1].id}`
    );
    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('should not be able to delete another user', async () => {
    const resultLogin = await request(app)
      .post('/users/login')
      .send(mockedCorrectLogin);
    const responseAllUser = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${resultLogin.body.token}`);
    const response = await request(app)
      .delete(`/users/delete/${responseAllUser.body[1].id}`)
      .set('Authorization', `Bearer ${resultLogin.body.token}`);
    expect(response.status).toBe(404);
  });
  test('should not be able to delete user without auth', async () => {
    const resultLogin = await request(app)
      .post('/users/login')
      .send(mockedCorrectLogin);
    const responseAllUser = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${resultLogin.body.token}`);
    const response = await request(app).delete(
      `/users/delete/${responseAllUser.body[1].id}`
    );
    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });
});
