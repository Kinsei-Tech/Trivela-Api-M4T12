import AppDataSource from '../../data-source';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/appError';

const listUserServices = async (id: string): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const user: User | null = await userRepository.findOneBy({ id: id });
  if (!user) {
    throw new AppError(400, 'User not found');
  }
  return user;
};

export default listUserServices;
