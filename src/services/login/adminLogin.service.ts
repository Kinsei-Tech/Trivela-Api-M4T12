import AppDataSource from '../../data-source';
import { AppError } from '../../errors/appError';
import { ILogin } from '../../interface/login';
import { Admin } from '../../entities/admin.entity';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const adminLoginService = async ({
  email,
  password,
}: ILogin): Promise<string> => {
  const adminRepository = AppDataSource.getRepository(Admin);
  const admin = await adminRepository.findOneBy({
    email: email,
  });
  if (!admin) {
    throw new AppError(403, 'Invalid admin or password');
  }
  const passwordMatch = await compare(password, admin.password);
  if (!passwordMatch) {
    throw new AppError(403, 'Invalid admin or password');
  }
  const token = jwt.sign(
    {
      email: admin.email,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: '24h',
      subject: admin.id,
    }
  );
  return token;
};

export default adminLoginService;
