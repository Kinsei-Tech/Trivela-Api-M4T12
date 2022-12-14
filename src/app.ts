import 'reflect-metadata';
import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import usersRoutes from './router/users/users.routes';
import teamsRoutes from './router/teams/teams.routes';
import participantesRoutes from './router/participants/participants.routes';
import { AppError } from './errors/appError';
import userLoginRouter from './router/login/userLogin.routes';
import ownerRouter from './router/owners/owners.routes';
import ownerLoginRouter from './router/login/ownerLogin.routes';
import filedsRouter from './router/fields/fields.routes';
import requestsRoutes from './router/requests/requests.routes';
import adminsRoutes from './router/admins/admins.routes';
import adminLoginRouter from './router/login/adminLogin.routes';
import adminsOwnerRouter from './router/admins/adminsOwners.routes';

const app = express();
app.use(express.json());

app.use('/users', usersRoutes);
app.use('/teams', teamsRoutes);
app.use('/participants', participantesRoutes);
app.use('/users/login', userLoginRouter);
app.use('/owners', ownerRouter);
app.use('/owners/login', ownerLoginRouter);
app.use('/admin/login', adminLoginRouter);
app.use('/fields', filedsRouter);
app.use('/requests', requestsRoutes);
app.use('/admin', adminsRoutes);
app.use('/admin/owners', adminsOwnerRouter);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(err);
  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
});

export default app;
