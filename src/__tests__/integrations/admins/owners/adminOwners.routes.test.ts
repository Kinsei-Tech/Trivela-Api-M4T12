/* import request from 'supertest';
import app from '../../../../app';
import { DataSource } from 'typeorm';
import AppDataSource from '../../../../data-source';
import { mockedOwnerRequest } from '../../../mocks/owners';

jest.setTimeout(30000);

describe('/admins/owners', () => {
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

  test('SOFTDELETE /admins/owners/deactivate/:id -  should not be able to delete owner without authentication', async () => {
    request(app)
      .post('/owners')
      .send(mockedOwnerRequest);
    const adminLoginResponse = await request(app)
      .post('/admins/login')
      .send(mockedAdminLogin);
    const ownerTobeDeleted = await request(app)
      .get('/admins/owners')
      .set('Authorization', `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app).delete(
      `/admins/owners/deactivate/${ownerTobeDeleted.body[0].id}`
    );

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('SOFTDELETE /admins/owners/deactivate/:id -  Must be able to soft delete owner', async () => {
    await request(app).post('/admins/owners').send(mockedOwnerRequest);

    const adminLoginResponse = await request(app)
      .post('/admins/login')
      .send(mockedAdminLogin);
    const ownerTobeDeleted = await request(app)
      .get('/admins/owners')
      .set('Authorization', `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/admins/owners/deactivate/${ownerTobeDeleted.body[0].id}`)
      .set('Authorization', `Bearer ${adminLoginResponse.body.token}`);
    const findOwner = await request(app)
      .get('/admins/owners')
      .set('Authorization', `Bearer ${adminLoginResponse.body.token}`);
    expect(response.status).toBe(204);
    expect(findOwner.body[0].isActive).toBe(false);
  });

  test("SOFTDELETE /admins/owners/deactivate/:id -  Shouldn't be able to delete owner with isActive = false", async () => {
    await request(app).post('/owners').send(mockedOwnerRequest);

    const adminLoginResponse = await request(app)
      .post('/admins/login')
      .send(mockedAdminLogin);
    const ownerTobeDeleted = await request(app)
      .get('/admins/owners')
      .set('Authorization', `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/admins/owners/deactivate/${ownerTobeDeleted.body[0].id}`)
      .set('Authorization', `Bearer ${adminLoginResponse.body.token}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  test('SOFTDELETE /admins/owners/deactivate/:id-  Should not be able to delete owner with invalid id', async () => {
    await request(app).post('/owners').send(mockedOwnerRequest);

    const adminLoginResponse = await request(app)
      .post('/admins/login')
      .send(mockedAdminLogin);

    const response = await request(app)
      .delete(`/admins/owners/deactivate/13970660-5dbe-423a-9a22-5c23b37943cf`)
      .set('Authorization', `Bearer ${adminLoginResponse.body.token}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });

  test('DELETE /admins/owners/:id-  It should be possible to delete the owner from the database', async () => {
    await request(app).post('/owners').send(mockedOwnerRequest);

    const adminLoginResponse = await request(app)
      .post('/admins/login')
      .send(mockedAdminLogin);
    const ownerTobeDeleted = await request(app)
      .get('/admins/owners')
      .set('Authorization', `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/admins/owners/${ownerTobeDeleted.body[0].id}`)
      .set('Authorization', `Bearer ${adminLoginResponse.body.token}`);

    expect(response.status).toBe(204);
  });

  test('DELETE /admins/owners/:id-  Should not be able to delete owner with invalid id', async () => {
    await request(app).post('/owners').send(mockedOwnerRequest);

    const adminLoginResponse = await request(app)
      .post('/owners/login')
      .send(mockedAdminLogin);

    const response = await request(app)
      .delete(`/admins/owners/deactivate/13970660-5dbe-423a-9a22-5c23b37943cf`)
      .set('Authorization', `Bearer ${adminLoginResponse.body.token}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });

  test('DELETE /admins/owners/:id -  should not be able to delete owner without authentication', async () => {
    const adminLoginResponse = await request(app)
      .post('/admins/login')
      .send(mockedAdminLogin);
    const ownerTobeDeleted = await request(app)
      .get('/admins/owners')
      .set('Authorization', `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app).delete(
      `/admins/owners/deactivate/${ownerTobeDeleted.body[0].id}`
    );

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });
});
 */