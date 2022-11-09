import { Request, Response } from 'express';
import updateFieldService from '../../services/fields/updateField.service';

const updateFieldController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const update = req.body;
  const loggedUser: string = req.user.id;
  const updateField = await updateFieldService(update, id, loggedUser);
  return res.status(201).json(updateField);
};
export default updateFieldController;
