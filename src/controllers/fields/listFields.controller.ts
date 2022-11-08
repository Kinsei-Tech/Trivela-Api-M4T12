import { Request, Response } from 'express';
import listFieldsService from '../../services/fields/listFields.service';

const listFieldsController = async (req: Request, res: Response) => {
  const loggedUser: string = req.user.id;
  const dataField = await listFieldsService(loggedUser);
  return res.json(dataField);
};
export default listFieldsController;
