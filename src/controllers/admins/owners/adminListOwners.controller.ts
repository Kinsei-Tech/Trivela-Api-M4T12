import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import adminListOwnersService from '../../../services/admins/owners/adminListOwners.service';


const adminListOwnersController = async (req: Request, res: Response) => {
  const owners = await adminListOwnersService();
  return res.json(instanceToPlain(owners));
};

export default adminListOwnersController;
