import { NextFunction, Request, Response } from 'express';
import AppDataSource from '../data-source';
import { Field } from '../entities/fields.entity';
import { AppError } from '../errors/appError';

const verifyIdFieldMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const fieldsRepository = AppDataSource.getRepository(Field);

  let fieldsId = await fieldsRepository.findOneBy({
    id,
  });

  if (id !== fieldsId?.id) {
    return res.status(404).json({
      message: 'No permission to change this field',
    });
  }
  return next();
};

export default verifyIdFieldMiddleware;
