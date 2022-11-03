import { Request, Response } from 'express';
import { IUserRequest } from '../../interface/users/users';
import createUserServices from '../../services/users/createUser.services';
import { instanceToPlain } from 'class-transformer';

const createUserController = async (req: Request, res: Response) => {
  const userData: IUserRequest = req.body;
  const user = await createUserServices(userData);
  return res.status(201).json(instanceToPlain(user));
};

export default createUserController;
