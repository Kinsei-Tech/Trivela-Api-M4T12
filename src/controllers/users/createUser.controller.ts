import { Request, Response } from 'express';
import { IUserRequest } from '../../interface/users/users';
import createUserServices from '../../services/users/createUser.services';
import { instanceToPlain } from 'class-transformer';
import { User } from '../../entities/user.entity';

const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: IUserRequest = req.body;
  const user: User = await createUserServices(userData);
  return res.status(201).json(instanceToPlain(user));
};

export default createUserController;
