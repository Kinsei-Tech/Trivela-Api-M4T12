import AppDataSource from '../../data-source';
import { Request } from '../../entities/requests.entity';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/appError';

const requestsListByUserService = async (id: string): Promise<Request[]> => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({ id });

  if (!findUser) {
    throw new AppError(404, 'User not found');
  }
  const listRequests = await userRepository.findOne({
    where: {
      id,
    },
    relations: {
      request: true,
    },
  });

  return listRequests!.request!;
};

export default requestsListByUserService;
