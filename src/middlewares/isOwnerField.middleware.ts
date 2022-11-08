import { NextFunction, Request, Response } from 'express';
import AppDataSource from '../data-source';
import { Field } from '../entities/fields.entity';
import { AppError } from '../errors/appError';

const isOwnerField = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const loggedUser = req.user.id;
  const fieldRepository = AppDataSource.getRepository(Field);
  const field = await fieldRepository.findOneBy({ id: id });

  if (!field) {
    throw new AppError(404, 'Field not found');
  }

  if (field.owner.id !== loggedUser) {
    throw new AppError(400, 'No permission to change this field');
  }

  return next();
};
export default isOwnerField;
