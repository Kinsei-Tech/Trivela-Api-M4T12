import { Request, Response } from 'express';
import { IOwnerUpdate } from '../../interface/owners';
import updateOwnerService from '../../services/owners/updateOwners.service';

const updateOwnerController = async (req: Request, res: Response) => {
  const data: IOwnerUpdate = req.validatedBody;
  const id: string = req.params.id;
  const updatedOwner = await updateOwnerService(data, id);
  return res.status(200).json(updatedOwner);
};

export default updateOwnerController;
