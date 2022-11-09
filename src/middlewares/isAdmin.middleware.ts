import { NextFunction, Request, Response } from 'express';
import AppDataSource from '../data-source';
import { Admin } from '../entities/admin.entity';
import { AppError } from '../errors/appError';

const isAdminOwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const adminId = req.user.id;

  const adminRepository = AppDataSource.getRepository(Admin);

  const findAdmin = await adminRepository.findOneBy({ id: adminId });
  if (!findAdmin) {
    throw new AppError(404, 'invalid admin');
  }

  next();
};

export default isAdminOwnerMiddleware;
