import { Request, Response } from 'express';
import updateFieldService from '../../services/fields/updateField.service';

const updateFieldController = async (req: Request, res: Response) => {
  const dataField = req.body;
  const { id } = req.params;
  await updateFieldService(dataField, id);
  return res.status(201).json({ message: 'Updated with sucess!' });
};
export default updateFieldController;
