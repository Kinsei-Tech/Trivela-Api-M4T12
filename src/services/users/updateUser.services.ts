import { Repository } from 'typeorm';
import AppDataSource from '../../data-source';
import { Position } from '../../entities/position.entity';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/appError';
import { IUserUpdate } from '../../interface/users/users';

const updatedUserService = async (
  id: string,
  {
    name,
    email,
    password,
    age,
    isExercising,
    telephone,
    height,
    weight,
    urlImg,
    adress,
    socialNetworks,
    positions,
  }: IUserUpdate
): Promise<User | null> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const positionsRepository: Repository<Position> =
    AppDataSource.getRepository(Position);
  let findUser: User | null = await userRepository.findOneBy({
    id,
  });

  if (!findUser) {
    throw new AppError(404, 'User not found');
  }
  const positionsUser = await positionsRepository.findOneBy({
    id: findUser.positions.id,
  });

  await positionsRepository.update(positionsUser!.id, {
    fixed: positions?.fixed ? positions.fixed : positionsUser?.fixed,
    goalkeeper: positions?.goalkeeper
      ? positions.goalkeeper
      : positionsUser?.goalkeeper,
    leftwing: positions?.leftwing
      ? positions.leftwing
      : positionsUser?.leftwing,
    rightwing: positions?.rightwing
      ? positions.rightwing
      : positionsUser?.rightwing,
    target: positions?.target ? positions.target : positionsUser?.target,
  });

  await userRepository.update(id, {
    name: name ? name : findUser.name,
    email: email ? email : findUser.email,
    password: password ? password : findUser.password,
    age: age ? age : findUser.age,
    isExercising: isExercising ? isExercising : findUser.isExercising,
    telephone: telephone ? telephone : findUser.telephone,
    height: height ? height : findUser.height,
    weight: weight ? weight : findUser.weight,
    urlImg: urlImg ? urlImg : findUser.urlImg,
  });
  findUser = await userRepository.findOneBy({
    id,
  });

  return findUser;
};

export default updatedUserService;
