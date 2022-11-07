import { Repository, SimpleConsoleLogger } from 'typeorm';
import AppDataSource from '../../data-source';
import { Address } from '../../entities/address.entity';
import { Position } from '../../entities/position.entity';
import { SocialNetWork } from '../../entities/socialNetwork.entity';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/appError';
import { IUserUpdate } from '../../interface/users/users';

const updatedUserService = async (
  id: string,
  update: IUserUpdate
): Promise<User | null> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const positionsRepository: Repository<Position> =
    AppDataSource.getRepository(Position);
  const socialNetworksRepository = AppDataSource.getRepository(SocialNetWork);
  const adressRepository = AppDataSource.getRepository(Address);

  let findUser: User | null = await userRepository.findOneBy({
    id,
  });

  if (!findUser) {
    throw new AppError(404, 'User not found');
  }
  const positionsUser = await positionsRepository.findOneBy({
    id: findUser.positions.id,
  });

  if (findUser.socialNetwork === null && update.socialNetwork) {
    const socialNetworksCreated = socialNetworksRepository.create({
      ...update.socialNetwork,
    });
    await socialNetworksRepository.save(socialNetworksCreated);
    userRepository.update(id, {
      socialNetwork: socialNetworksCreated,
    });
  } else if (update.socialNetwork) {
    await socialNetworksRepository.update(findUser.socialNetwork.id, {
      ...update.socialNetwork,
    });
  }

  if (update.positions) {
    await positionsRepository.update(positionsUser!.id, {
      ...update.positions,
    });
  }

  /* const adressUser = await adressRepository.findOneBy({
    id: findUser.address.id,
  }); */
  if (update.address) {
    await adressRepository.update(findUser.address.id, {
      ...update.address,
    });
  }

  const updateUser = { ...update };
  delete updateUser.socialNetwork;
  delete updateUser.positions;
  delete updateUser.address;

  await userRepository.update(id, { ...updateUser });
  findUser = await userRepository.findOneBy({
    id,
  });

  return findUser;
};

export default updatedUserService;
