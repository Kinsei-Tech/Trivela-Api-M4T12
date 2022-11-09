import { Request, Response } from 'express';
import adminSoftDeleteOwnerService from '../../../services/admin/owners/adminSoftDeleteOwner.service';


const adminSoftDeleteOwnerController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const deletedUser = await adminSoftDeleteOwnerService(id);
  return res.status(204).json(deletedUser);
};

export default adminSoftDeleteOwnerController;
