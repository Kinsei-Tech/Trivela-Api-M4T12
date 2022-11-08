import AppDataSource from '../../data-source';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/appError';

const listUserServices = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({where : {id}, relations : {team : true}});
  if (!user) {
    throw new AppError(400, 'User not found');
  }
  return user;
};

export default listUserServices;
