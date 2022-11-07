import 'reflect-metadata';
import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import usersRoutes from './router/users/users.routes';
import teamsRoutes from './router/teams/teams.routes';
import { AppError } from './errors/appError';
import userLoginRouter from './router/login/userLogin.routes';

const app = express();
app.use(express.json());

app.use('/users', usersRoutes);
app.use('/teams', teamsRoutes);
app.use('/users/login', userLoginRouter);

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
