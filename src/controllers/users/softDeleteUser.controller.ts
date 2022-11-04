import { Request, Response } from 'express';
import softDeleteUserService from '../../services/users/softDeleteUser.services';

const softDeleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: string = req.params.id;
  const deletedUser = await softDeleteUserService(id);
  return res.status(204).json(deletedUser);
};

export default softDeleteUserController;
