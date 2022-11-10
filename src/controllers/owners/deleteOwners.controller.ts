import { Request, Response } from 'express';
import deleteOwnerService from '../../services/owners/deleteOwners.service';

const deleteOwnerController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  await deleteOwnerService(id);
  return res.status(204).json({ message: 'DELETED ACCOUNT' });
};

export default deleteOwnerController;
