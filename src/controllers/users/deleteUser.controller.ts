import { Request, Response } from 'express';
import deleteUserService from '../../services/users/deleteUser.services';

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: string = req.params.id;
  const deletedUser: void = await deleteUserService(id);
  return res.status(204).json(deletedUser);
};
export default deleteUserController;
