import AppDataSource from '../../data-source';
import { AppError } from '../../errors/appError';
import { ILogin } from '../../interface/login';
import { Owner } from '../../entities/owner.entity';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const ownerLoginService = async ({
  email,
  password,
}: ILogin): Promise<string> => {
  const ownerRepository = AppDataSource.getRepository(Owner);
  const owner = await ownerRepository.findOneBy({
    email: email,
  });
  if (!owner) {
    throw new AppError(403, 'Invalid user or password');
  }
  const passwordMatch = await compare(password, owner.password);
  if (!passwordMatch) {
    throw new AppError(403, 'Invalid user or password');
  }
  const token = jwt.sign(
    {
      email: owner.email,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: '24h',
      subject: owner.id,
    }
  );
  return token;
};

export default ownerLoginService;
