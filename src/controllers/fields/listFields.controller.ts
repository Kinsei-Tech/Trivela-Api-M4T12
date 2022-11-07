import { Request, Response } from 'express';
import listFieldsService from '../../services/fields/listFields.service';

const listFieldsController = async (req: Request, res: Response) => {
  const dataField = await listFieldsService();
  return res.json(dataField);
};
export default listFieldsController;
