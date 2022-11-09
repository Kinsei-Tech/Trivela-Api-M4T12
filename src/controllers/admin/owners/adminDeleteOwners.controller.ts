import { Request, Response } from 'express';
import adminDeleteOwnerService from '../../../services/admin/owners/adminDeleteOwners.service';


const adminDeleteOwnerController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  await adminDeleteOwnerService(id);
  return res.status(204).json({ message: 'DELETED ACCOUNT' });
};

export default adminDeleteOwnerController;
