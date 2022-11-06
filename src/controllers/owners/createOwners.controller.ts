import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { IOwnerRequest } from '../../interface/owners';
import createOwnerService from '../../services/owners/createOwners.service';

const createOwnerController = async (req: Request, res: Response) => {
  const data: IOwnerRequest = req.body;
  const createdOwner = await createOwnerService(data);
  return res.status(201).json(instanceToPlain(createdOwner));
};

export default createOwnerController;
