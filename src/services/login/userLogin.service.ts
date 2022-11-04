import AppDataSource from '../../data-source';
import { AppError } from '../../errors/appError';
import { ILogin } from '../../interface/login';
import { User } from '../../entities/user.entity';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const userLoginService = async ({
  email,
  password,
}: ILogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    email: email,
  });
  if (!user) {
    throw new AppError(403, 'Invalid user or password');
  }
  const passwordMatch = await compare(password, user.password);
  if (!passwordMatch) {
    throw new AppError(403, 'Invalid user or password');
  }
  const token = jwt.sign(
    {
      email: user.email,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: '24h',
      subject: user.id,
    }
  );
  return token;
};

export default userLoginService;