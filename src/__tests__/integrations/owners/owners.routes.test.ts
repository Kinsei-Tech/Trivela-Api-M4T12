import request from 'supertest';
import app from '../../../app';
import { DataSource } from 'typeorm';
import AppDataSource from '../../../data-source';
import { mockedOwnerLogin, mockedOwnerRequest } from '../../mocks/owners';

jest.setTimeout(30000);

describe('/owners', () => {
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

  test('POST /owners -> Must be able to create an owner', async () => {
    const resultCreateOwner = await request(app)
      .post('/owners')
      .send(mockedOwnerRequest);
    expect(resultCreateOwner.body).toHaveProperty('id');
    expect(resultCreateOwner.body).toHaveProperty('name');
    expect(resultCreateOwner.body).toHaveProperty('email');
    expect(resultCreateOwner.body).toHaveProperty('isActive');
    expect(resultCreateOwner.body).not.toHaveProperty('password');
    expect(resultCreateOwner.body.email).toEqual('srtrivela@email.com');
    expect(resultCreateOwner.body.name).toEqual('SrTrivela');
    expect(resultCreateOwner.body.isActive).toEqual(true);
    expect(resultCreateOwner.status).toBe(201);
  });

  test('POST /owners -  Should not be able to create an existing owner', async () => {
    const resultCreateOwner = await request(app)
      .post('/owners')
      .send(mockedOwnerRequest);

    expect(resultCreateOwner.body).toHaveProperty('message');
    expect(resultCreateOwner.status).toBe(400);
  });

  test(`PATCH /owners/:id - Shouldn't be able to change an owner if not authenticated`, async () => {
    const ownerLoginResponse = await request(app)
      .post('/owners/login')
      .send(mockedOwnerLogin);
    const ownerToBeUpdate = await request(app)
      .get('/owners')
      .set('Authorization', `Bearer ${ownerLoginResponse.body.token}`);
    const response = await request(app).patch(
      `/owners/${ownerToBeUpdate.body[0].id}`
    );
    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test(`PATCH /owners/:id - Should not be able to update owner with invalid id`, async () => {
    const newValues = { name: 'Sr Trivela 2', email: 'srtrivela2@mail.com' };

    const ownerLoginResponse = await request(app)
      .post('/owners/login')
      .send(mockedOwnerLogin);
    const token = `Bearer ${ownerLoginResponse.body.token}`;

    const ownerTobeUpdateRequest = await request(app)
      .get('/owners')
      .set('Authorization', token);

    const ownerTobeUpdateId = ownerTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/owners/13970660-5dbe-423a-9a9d-5c93b37943cf`)
      .set('Authorization', token)
      .send(newValues);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test('PATCH /owners/:id - should not be able to update isActive field value', async () => {
    const newValues = { isActive: false };

    const ownerLoginResponse = await request(app)
      .post('/owners/login')
      .send(mockedOwnerLogin);
    const token = `Bearer ${ownerLoginResponse.body.token}`;

    const ownerTobeUpdateRequest = await request(app)
      .get('/owners')
      .set('Authorization', token);
    const ownerTobeUpdateId = ownerTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/owners/${ownerTobeUpdateId}`)
      .set('Authorization', token)
      .send(newValues);
    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('PATCH /owners/:id - should not be able to update id field value', async () => {
    const newValues = { id: '9999999999ssssssssss999999999' };

    const ownerLoginResponse = await request(app)
      .post('/owners/login')
      .send(mockedOwnerLogin);
    const token = `Bearer ${ownerLoginResponse.body.token}`;

    const ownerTobeUpdateRequest = await request(app)
      .get('/owners')
      .set('Authorization', token);
    const ownerTobeUpdateId = ownerTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/owners/${ownerTobeUpdateId}`)
      .set('Authorization', token)
      .send(newValues);
    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('PATCH /owners/:id -  should be able to update owner', async () => {
    const newValues = { name: 'Sr Trivela 2' };

    const ownerLoginResponse = await request(app)
      .post('/owners/login')
      .send(mockedOwnerLogin);
    const token = `Bearer ${ownerLoginResponse.body.token}`;

    const ownerTobeUpdateRequest = await request(app)
      .get('/owners')
      .set('Authorization', token);
    const userTobeUpdateId = ownerTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/owners/${userTobeUpdateId}`)
      .set('Authorization', token)
      .send(newValues);

    const ownerUpdated = await request(app)
      .get('/owners')
      .set('Authorization', token);

    expect(response.status).toBe(200);
    expect(ownerUpdated.body[0].name).toEqual('Sr Trivela 2');
    expect(ownerUpdated.body[0]).not.toHaveProperty('password');
  });

  test('SOFTDELETE /owners/soft/:id -  should not be able to delete owner without authentication', async () => {
    const ownerLoginResponse = await request(app)
      .post('/owners/login')
      .send(mockedOwnerLogin);
    const ownerTobeDeleted = await request(app)
      .get('/owners')
      .set('Authorization', `Bearer ${ownerLoginResponse.body.token}`);

    const response = await request(app).delete(
      `/owners/soft/${ownerTobeDeleted.body[0].id}`
    );

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('SOFTDELETE /owners/soft/:id -  Must be able to soft delete owner', async () => {
    await request(app).post('/owners').send(mockedOwnerRequest);

    const ownerLoginResponse = await request(app)
      .post('/owners/login')
      .send(mockedOwnerLogin);
    const ownerTobeDeleted = await request(app)
      .get('/owners')
      .set('Authorization', `Bearer ${ownerLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/owners/soft/${ownerTobeDeleted.body[0].id}`)
      .set('Authorization', `Bearer ${ownerLoginResponse.body.token}`);
    const findOwner = await request(app)
      .get('/owners')
      .set('Authorization', `Bearer ${ownerLoginResponse.body.token}`);
    expect(response.status).toBe(204);
    expect(findOwner.body[0].isActive).toBe(false);
  });

  test("SOFTDELETE /owners/soft/:id -  Shouldn't be able to delete owner with isActive = false", async () => {
    await request(app).post('/owners').send(mockedOwnerRequest);

    const ownerLoginResponse = await request(app)
      .post('/owners/login')
      .send(mockedOwnerLogin);
    const ownerTobeDeleted = await request(app)
      .get('/owners')
      .set('Authorization', `Bearer ${ownerLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/owners/soft/${ownerTobeDeleted.body[0].id}`)
      .set('Authorization', `Bearer ${ownerLoginResponse.body.token}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  test('SOFTDELETE /owners/soft/:id-  Should not be able to delete owner with invalid id', async () => {
    await request(app).post('/owners').send(mockedOwnerRequest);

    const ownerLoginResponse = await request(app)
      .post('/owners/login')
      .send(mockedOwnerLogin);

    const response = await request(app)
      .delete(`/owners/soft/13970660-5dbe-423a-9a22-5c23b37943cf`)
      .set('Authorization', `Bearer ${ownerLoginResponse.body.token}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });

  test('DELETE /owners/:id-  It should be possible to delete itself from the database', async () => {
    await request(app).post('/owners').send(mockedOwnerRequest);

    const ownerLoginResponse = await request(app)
      .post('/owners/login')
      .send(mockedOwnerLogin);
    const ownerTobeDeleted = await request(app)
      .get('/owners')
      .set('Authorization', `Bearer ${ownerLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/owners/${ownerTobeDeleted.body[0].id}`)
      .set('Authorization', `Bearer ${ownerLoginResponse.body.token}`);

    expect(response.status).toBe(204);
  });

  test('DELETE /owners/:id-  Should not be able to delete owner with invalid id', async () => {
    await request(app).post('/owners').send(mockedOwnerRequest);

    const ownerLoginResponse = await request(app)
      .post('/owners/login')
      .send(mockedOwnerLogin);

    const response = await request(app)
      .delete(`/owners/soft/13970660-5dbe-423a-9a22-5c23b37943cf`)
      .set('Authorization', `Bearer ${ownerLoginResponse.body.token}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });

  test('DELETE /owners/:id -  should not be able to delete owner without authentication', async () => {
    const ownerLoginResponse = await request(app)
      .post('/owners/login')
      .send(mockedOwnerLogin);
    const ownerTobeDeleted = await request(app)
      .get('/owners')
      .set('Authorization', `Bearer ${ownerLoginResponse.body.token}`);

    const response = await request(app).delete(
      `/owners/soft/${ownerTobeDeleted.body[0].id}`
    );

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });
});
