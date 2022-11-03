import { hash } from 'bcryptjs';
import AppDataSource from '../../data-source';
import { Adress } from '../../entities/adress.entity';
import { Position } from '../../entities/position.entity';
import { Request } from '../../entities/requests.entity';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/appError';
import { IUser, IUserRequest } from '../../interface/users/users';

const createUserServices = async (userData: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const adressRepository = AppDataSource.getRepository(Adress);
  const positonsRepository = AppDataSource.getRepository(Position);
  const requestRepository = AppDataSource.getRepository(Request);

  let users = await userRepository.find();

  const emailAlreadyExists: IUser | undefined = users.find(
    (user) => user.email === userData.email
  );
  if (emailAlreadyExists) {
    throw new AppError(400, 'Email already exists');
  }

  const adresses = adressRepository.create({
    state: userData.adress.state,
    city: userData.adress.city,
    district: userData.adress.district,
    street: userData.adress.street,
    number: userData.adress.number,
    zipCode: userData.adress.zipCode,
    complement: userData.adress.complement,
  });
  await adressRepository.save(adresses);

  const position = positonsRepository.create({
    fixed: userData.position.fixed,
    leftwing: userData.position.leftwing,
    goalkeeper: userData.position.goalkeeper,
    rightwing: userData.position.rightwing,
    target: userData.position.target,
  });
  await positonsRepository.save(position);

  const hashedPassword: string = await hash(userData.password, 10);
  const newUser = new User();
  newUser.name = userData.name;
  newUser.email = userData.email;
  newUser.password = hashedPassword;
  newUser.age = userData.age;
  newUser.height = userData.height;
  newUser.weight = userData.weight;
  newUser.telephone = userData.telephone;
  newUser.isExercising = userData.isExercising;
  newUser.urlImg = userData.urlImg;
  newUser.positions = position;
  newUser.address = adresses;

  const user: User = userRepository.create(newUser);
  await userRepository.save(user);

  const userCreated = await userRepository.findOneBy({ id: user.id });

  return userCreated!;
};

export default createUserServices;
