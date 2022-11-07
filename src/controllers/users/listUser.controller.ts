import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import listUserServices from '../../services/users/listUser.services';
import { User } from '../../entities/user.entity';

const listUserController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const users: User = await listUserServices(id);
  return res.json(instanceToPlain(users));
};

//status 201 não seria usado apenas quando criamos um novo usuário, time, address...?
//Acredito que aqui seria o status 200 default

export default listUserController;
