import { Request, Response } from 'express';
import deleteFieldService from '../../services/fields/deleteField.service';

const deleteFieldController = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteFieldService(id);
  return res.status(204).json({
    message: 'User deleted with sucess!',
  });
};
export default deleteFieldController;
