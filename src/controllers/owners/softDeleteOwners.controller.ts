import { Request, Response } from 'express';
import softDeleteOwnerService from '../../services/owners/softDeleteOwner.service';

const softDeleteOwnerController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const deletedUser = await softDeleteOwnerService(id);
  return res.status(204).json(deletedUser);
};

export default softDeleteOwnerController;
