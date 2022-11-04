import { Request, Response } from 'express';
import listUsersServices from '../../services/users/listUsers.services';
import { instanceToPlain } from 'class-transformer';
import { User } from '../../entities/user.entity';

const listUsersController = async (req: Request, res: Response) => {
  const users: User[] = await listUsersServices();
  return res.status(201).json(instanceToPlain(users));
};

export default listUsersController;
