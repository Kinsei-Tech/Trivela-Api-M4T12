import { Request, Response } from 'express';
import { IFieldRequest } from '../../interface/fields/fields';
import createFieldService from '../../services/fields/createField.service';

const createFieldController = async (req: Request, res: Response) => {
  const fieldData: IFieldRequest = req.validatedBody;
  const id: string = req.user.id;
  const field = await createFieldService(fieldData, id);
  return res.status(201).json(field);
};
export default createFieldController;
