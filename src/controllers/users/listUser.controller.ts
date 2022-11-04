import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import listUserServices from '../../services/users/listUser.services';
import { User } from '../../entities/user.entity';

const listUserController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const users: User = await listUserServices(id);
  return res.status(201).json(instanceToPlain(users));
};

export default listUserController;
