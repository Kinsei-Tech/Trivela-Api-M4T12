import { Repository } from 'typeorm';
import AppDataSource from '../../data-source';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/appError';

const deleteUserService = async (id: string): Promise<void> => {
  const userRespository: Repository<User> = AppDataSource.getRepository(User);
  const deleteUser: User | null = await userRespository.findOneBy({ id });
  if (!deleteUser) {
    throw new AppError(404, 'User ID not found');
  }

  await userRespository.delete(id);

  return;
};
export default deleteUserService;
