import request from 'supertest';
import app from '../../../app';
import { DataSource } from 'typeorm';
import AppDataSource from '../../../data-source';
import { mockedAdminDelete, mockedField2 } from '../../mocks/adminFields';
import { mockedcreateOwner, mockedOwnerLogin } from '../../mocks/fields';

describe('/admin/fields', () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((error) => {
        console.log('Error during Data Source initialization', error);
      });
    await request(app).post('/owners').send();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('SOFT DELETE /fields/deactivate/:id ->  Must be able to soft delete field', async () => {
    const createAdmin = await request(app)
      .post('/admin')
      .send(mockedAdminDelete);

    const loginAdmin = await request(app)
      .post('/admin/login')
      .send(mockedAdminDelete);

    await request(app).post('/owners').send(mockedcreateOwner);

    const ownerLogin = await request(app)
      .post('/owners/login')
      .send(mockedOwnerLogin);

    const resultCreateField = await request(app)
      .post('/fields')
      .set('Authorization', `Bearer ${ownerLogin.body.token}`)
      .send(mockedField2);

    const findField = await request(app)
      .get('/fields/owners')
      .set('Authorization', `Bearer ${ownerLogin.body.token}`);

    const response = await request(app)
      .delete(`/admin/fields/deactivate/${findField.body.id}`)
      .set('Authorization', `Bearer ${loginAdmin.body.token}`);

    const findField2 = await request(app)
      .get('/fields/owners')
      .set('Authorization', `Bearer ${ownerLogin.body.token}`);

    expect(findField2.body.isActive).toBe(false);
    expect(response.status).toBe(200);
  });

  test('SOFT DELETE /fields/deactivate/:id -> should not be able to delete field without authentication', async () => {
    const createAdmin = await request(app)
      .post('/admin')
      .send(mockedAdminDelete);

    const loginAdmin = await request(app)
      .post('/admin/login')
      .send(mockedAdminDelete);

    await request(app).post('/owners').send(mockedcreateOwner);

    const ownerLogin = await request(app)
      .post('/owners/login')
      .send(mockedOwnerLogin);

    const resultCreateField = await request(app)
      .post('/fields')
      .set('Authorization', `Bearer ${ownerLogin.body.token}`)
      .send(mockedField2);

    const findField = await request(app)
      .get('/fields/owners')
      .set('Authorization', `Bearer ${ownerLogin.body.token}`);

    const response = await request(app)
      .delete(`/admin/fields/deactivate/${findField.body.id}`)
      .set('Authorization', `Bearer`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('DELETE /fields/delete/:id -> should be able to delete the field ', async () => {
    const createAdmin = await request(app)
      .post('/admin')
      .send(mockedAdminDelete);

    const loginAdmin = await request(app)
      .post('/admin/login')
      .send(mockedAdminDelete);

    await request(app).post('/owners').send(mockedcreateOwner);

    const ownerLogin = await request(app)
      .post('/owners/login')
      .send(mockedOwnerLogin);

    const resultCreateField = await request(app)
      .post('/fields')
      .set('Authorization', `Bearer ${ownerLogin.body.token}`)
      .send(mockedField2);

    const findField = await request(app)
      .get('/fields/owners')
      .set('Authorization', `Bearer ${ownerLogin.body.token}`);

    const response = await request(app)
      .delete(`/admin/fields/delete/${findField.body.id}`)
      .set('Authorization', `Bearer ${loginAdmin.body.token}`);

    const findField2 = await request(app)
      .get('/fields/owners')
      .set('Authorization', `Bearer ${ownerLogin.body.token}`);

    expect(response.status).toBe(204);
  });

  test('DELETE /fields/delete/:id -> should not be able to delete field without authentication', async () => {
    const createAdmin = await request(app)
      .post('/admin')
      .send(mockedAdminDelete);

    const loginAdmin = await request(app)
      .post('/admin/login')
      .send(mockedAdminDelete);

    await request(app).post('/owners').send(mockedcreateOwner);

    const ownerLogin = await request(app)
      .post('/owners/login')
      .send(mockedOwnerLogin);

    const resultCreateField = await request(app)
      .post('/fields')
      .set('Authorization', `Bearer ${ownerLogin.body.token}`)
      .send(mockedField2);

    const findField = await request(app)
      .get('/fields/owners')
      .set('Authorization', `Bearer ${ownerLogin.body.token}`);

    const response = await request(app)
      .delete(`/admin/fields/delete/${findField.body.id}`)
      .set('Authorization', `Bearer`);

    const findField2 = await request(app)
      .get('/fields/owners')
      .set('Authorization', `Bearer ${ownerLogin.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });
});
