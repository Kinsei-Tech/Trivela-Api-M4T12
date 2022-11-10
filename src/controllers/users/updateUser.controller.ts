import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { User } from '../../entities/user.entity';
import { IUserUpdate } from '../../interface/users/users';
import updatedUserService from '../../services/users/updateUser.services';
import { AppError, handleError } from '../../errors/appError';

const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: string = req.params.id;
  const update: IUserUpdate = req.validatedBody;
  const updatedUser: User = await updatedUserService(id, update);

  return res.json(instanceToPlain(updatedUser));
};

export default updateUserController;
