import { Request, Response } from 'express';
import softDeleteFieldService from '../../services/fields/softDeleteField.service';

const softDeleteFieldController = async (req: Request, res: Response) => {
  const { id } = req.params;
  await softDeleteFieldService(id);
  return res.status(200).json({
    message: 'Field deleted with success!',
  });
};
export default softDeleteFieldController;
