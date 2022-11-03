import { Request, Response } from 'express';
import listUsersServices from '../../services/users/listUser.services';
import { instanceToPlain } from 'class-transformer';
import { IUser } from '../../interface/users/users';

const listUsersController = async (req: Request, res: Response) => {
  const users: IUser[] = await listUsersServices();
  return res.status(201).json(instanceToPlain(users));
};

export default listUsersController;
