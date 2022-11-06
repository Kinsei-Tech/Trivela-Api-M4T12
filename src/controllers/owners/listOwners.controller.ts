import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import listOwnersService from '../../services/owners/listOwners.service';

const listOwnersController = async (req: Request, res: Response) => {
  const owners = await listOwnersService();
  return res.json(instanceToPlain(owners));
};

export default listOwnersController;
