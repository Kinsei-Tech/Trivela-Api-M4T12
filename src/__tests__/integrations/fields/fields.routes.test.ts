import request from 'supertest';
import app from '../../../app';
import { DataSource } from 'typeorm';
import {
  mockedcreateOwner,
  mockedField,
  mockedListOwner,
  mockedOwnerLogin,
  mockedUpdateField,
} from '../../mocks/fields';
import AppDataSource from '../../../data-source';

describe('/fields', () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((error) => {
        console.log('Error during Data Source initialization', error);
      });
    await request(app).post('/owners').send(mockedcreateOwner);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('POST /fields -> Must be able to create an field', async () => {
    const ownerLogin = await request(app)
      .post('/owners/login')
      .send(mockedOwnerLogin);

    const resultCreateField = await request(app)
      .post('/fields')
      .set('Authorization', `Bearer ${ownerLogin.body.token}`)
      .send(mockedField);

    expect(resultCreateField.body).toHaveProperty('id');
    expect(resultCreateField.body).toHaveProperty('name');
    expect(resultCreateField.body.address).toHaveProperty('street');
    expect(resultCreateField.body.address).toHaveProperty('district');
    expect(resultCreateField.body.address).toHaveProperty('zipCode');
    expect(resultCreateField.body.address).toHaveProperty('number');
    expect(resultCreateField.body.address).toHaveProperty('complement');
    expect(resultCreateField.body.address).toHaveProperty('city');
    expect(resultCreateField.body.address).toHaveProperty('state');
    expect(resultCreateField.status).toBe(201);
  });

  test('POST /fields -> Should not be able to create an existing field', async () => {
    const ownerLogin = await request(app)
      .post('/owners/login')
      .send(mockedOwnerLogin);

    const resultCreateField = await request(app)
      .post('/fields')
      .set('Authorization', `Bearer ${ownerLogin.body.token}`)
      .send(mockedField);

    expect(resultCreateField.body).toHaveProperty('message');
    expect(resultCreateField.status).toBe(400);
  });

  test('GET /fields -> should be able to list fields with auth', async () => {
    const ownerLogin = await request(app)
      .post('/owners/login')
      .send(mockedOwnerLogin);

    const response = await request(app)
      .get('/fields/owners')
      .set('Authorization', `Bearer ${ownerLogin.body.token}`)
      .send(mockedListOwner);

    expect(response.body).toHaveProperty('isActive');
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
    expect(response.body.address).toHaveProperty('id');
    expect(response.body.address).toHaveProperty('street');
    expect(response.body.address).toHaveProperty('district');
    expect(response.body.address).toHaveProperty('zipCode');
    expect(response.body.address).toHaveProperty('number');
    expect(response.body.address).toHaveProperty('complement');
    expect(response.body.address).toHaveProperty('city');
    expect(response.body.address).toHaveProperty('state');
    expect(response.body.owner).toHaveProperty('id');
    expect(response.body.owner).toHaveProperty('name');
    expect(response.body.owner).toHaveProperty('createdAt');
    expect(response.body.owner).toHaveProperty('updatedAt');
    expect(response.body.owner).toHaveProperty('email');
    expect(response.body.owner).toHaveProperty('isActive');
    expect(response.status).toBe(200);
  });

  test('GET /fields -> should not be able to list fields without auth', async () => {
    const response = await request(app)
      .get('/fields/owners')
      .set('Authorization', `Bearer`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('PATCH /fields/owners:id -> should be able to update field', async () => {
    const ownerLogin = await request(app)
      .post('/owners/login')
      .send(mockedOwnerLogin);

    const fieldTobeUpdateRequest = await request(app)
      .get('/fields/owners')
      .set('Authorization', `Bearer ${ownerLogin.body.token}`);

    const fieldTobeUpdateId = fieldTobeUpdateRequest.body.id;
    const response = await request(app)
      .patch(`/fields/owners/${fieldTobeUpdateId}`)
      .set('Authorization', `Bearer ${ownerLogin.body.token}`)
      .send(mockedUpdateField);

    const fieldUpdate = await request(app)
      .get('/fields/owners')
      .set('Authorization', `Bearer ${ownerLogin.body.token}`);

    expect(fieldUpdate.body.name).toEqual('Cacetinho Supremo');
    expect(fieldUpdate.body.address.street).toEqual('Rua Hermam Tolêdo');
    expect(fieldUpdate.body.address.district).toEqual('São Pedro');
    expect(fieldUpdate.body.address.zipCode).toEqual('36037-280');
    expect(fieldUpdate.body.address.city).toEqual('Otra cidade');
    expect(fieldUpdate.body.address.state).toEqual('RS');
    expect(response.status).toBe(201);
  });

  test('PATCH /fields/owners:id -> Should not be able to update an field if not authenticated', async () => {
    const ownerLogin = await request(app)
      .post('/owners/login')
      .send(mockedOwnerLogin);

    const fieldTobeUpdateRequest = await request(app)
      .get('/fields/owners')
      .set('Authorization', `Bearer ${ownerLogin.body.token}`);

    const fieldTobeUpdateId = fieldTobeUpdateRequest.body.id;
    const response = await request(app)
      .patch(`/fields/owners/${fieldTobeUpdateId}`)
      .set('Authorization', `Bearer`)
      .send(mockedUpdateField);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('PATCH /fields/owners:id -> Should not be able to update field with invalid id', async () => {
    const ownerLogin = await request(app)
      .post('/owners/login')
      .send(mockedOwnerLogin);

    const fieldTobeUpdateRequest = await request(app)
      .get('/fields/owners')
      .set('Authorization', `Bearer ${ownerLogin.body.token}`);

    const fieldTobeUpdateId = fieldTobeUpdateRequest.body.id;
    const response = await request(app)
      .patch(`/fields/owners/13970260-5dbe-323a-7a9d-5c93b37943cf`)
      .set('Authorization', `Bearer ${ownerLogin.body.token}`)
      .send(mockedUpdateField);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test('PATCH /fields/owners:id -> should not be able to update id field', async () => {
    const newValues = { id: '13970260-5dbe-323a-7a9d-5c93b37943cf' };

    const ownerLogin = await request(app)
      .post('/owners/login')
      .send(mockedOwnerLogin);

    const fieldTobeUpdateRequest = await request(app)
      .get('/fields/owners')
      .set('Authorization', `Bearer ${ownerLogin.body.token}`);

    const fieldTobeUpdateId = fieldTobeUpdateRequest.body.id;
    const response = await request(app)
      .patch(`/fields/owners/${fieldTobeUpdateId}`)
      .set('Authorization', `Bearer ${ownerLogin.body.token}`)
      .send(newValues);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('SOFTDELETE /fields/deactivate:id ->  Must be able to soft delete field', async () => {
    const ownerLogin = await request(app)
      .post('/owners/login')
      .send(mockedOwnerLogin);

    const resultCreateField = await request(app)
      .post('/fields')
      .set('Authorization', `Bearer ${ownerLogin.body.token}`)
      .send(mockedField);

    const findField = await request(app)
      .get('/fields/owners')
      .set('Authorization', `Bearer ${ownerLogin.body.token}`);

    const response = await request(app)
      .delete(`/fields/deactivate/${findField.body.id}`)
      .set('Authorization', `Bearer ${ownerLogin.body.token}`);

    const findField2 = await request(app)
      .get('/fields/owners')
      .set('Authorization', `Bearer ${ownerLogin.body.token}`);

    expect(findField2.body.isActive).toBe(false);
    expect(response.status).toBe(200);
  });

  test('SOFTDELETE /fields/deactivate:id -> should not be able to delete field without authentication', async () => {
    const ownerLogin = await request(app)
      .post('/owners/login')
      .send(mockedOwnerLogin);

    const resultCreateField = await request(app)
      .post('/fields')
      .set('Authorization', `Bearer ${ownerLogin.body.token}`)
      .send(mockedField);

    const findField = await request(app)
      .get('/fields/owners')
      .set('Authorization', `Bearer ${ownerLogin.body.token}`);

    const response = await request(app)
      .delete(`/fields/deactivate/${findField.body.id}`)
      .set('Authorization', `Bearer`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('SOFTDELETE /fields/deactivate:id -> Should not be able to delete field with invalid id', async () => {
    const ownerLogin = await request(app)
      .post('/owners/login')
      .send(mockedOwnerLogin);

    const response = await request(app)
      .delete(`/fields/deactivate/54970260-5dbe-323a-7a9d-5g93b37943wz`)
      .set('Authorization', `Bearer ${ownerLogin.body.token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });

  test('DELETE /fields/delete:id -> should be able to delete the field ', async () => {
    const ownerLogin = await request(app)
      .post('/owners/login')
      .send(mockedOwnerLogin);

    const resultCreateField = await request(app)
      .post('/fields')
      .set('Authorization', `Bearer ${ownerLogin.body.token}`)
      .send(mockedField);

    const findField = await request(app)
      .get('/fields/owners')
      .set('Authorization', `Bearer ${ownerLogin.body.token}`);

    const response = await request(app)
      .delete(`/fields/delete/${findField.body.id}`)
      .set('Authorization', `Bearer ${ownerLogin.body.token}`);

    const findField2 = await request(app)
      .get('/fields/owners')
      .set('Authorization', `Bearer ${ownerLogin.body.token}`);

    expect(response.status).toBe(204);
  });

  test('DELETE /fields/delete:id -> should not be able to delete field without authentication', async () => {
    const ownerLogin = await request(app)
      .post('/owners/login')
      .send(mockedOwnerLogin);

    const resultCreateField = await request(app)
      .post('/fields')
      .set('Authorization', `Bearer ${ownerLogin.body.token}`)
      .send(mockedField);

    const findField = await request(app)
      .get('/fields/owners')
      .set('Authorization', `Bearer ${ownerLogin.body.token}`);

    const response = await request(app)
      .delete(`/fields/delete/${findField.body.id}`)
      .set('Authorization', `Bearer`);
  });

  test('DELETE /fields/delete:id -> Should not be able to delete field with invalid id', async () => {
    const ownerLogin = await request(app)
      .post('/owners/login')
      .send(mockedOwnerLogin);

    const resultCreateField = await request(app)
      .post('/fields')
      .set('Authorization', `Bearer ${ownerLogin.body.token}`)
      .send(mockedField);

    const findField = await request(app)
      .get('/fields/owners')
      .set('Authorization', `Bearer ${ownerLogin.body.token}`);

    const response = await request(app).delete(
      `/fields/delete/${findField.body.id}`
    );

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });
});
