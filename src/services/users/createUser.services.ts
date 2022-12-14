import { hash } from 'bcryptjs';
import AppDataSource from '../../data-source';
import { Address } from '../../entities/address.entity';
import { Position } from '../../entities/position.entity';
import { Request } from '../../entities/requests.entity';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/appError';
import { IUser, IUserRequest } from '../../interface/users/users';

const createUserServices = async (userData: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const addressRepository = AppDataSource.getRepository(Address);
  const positonsRepository = AppDataSource.getRepository(Position);
  const requestRepository = AppDataSource.getRepository(Request);

  const users: User[] = await userRepository.find();

  const emailAlreadyExists: IUser | undefined = users.find(
    (user) => user.email === userData.email
  );
  if (emailAlreadyExists) {
    throw new AppError(400, 'Email already exists');
  }

  const addresses: Address = addressRepository.create({
    state: userData.address.state,
    city: userData.address.city,
    district: userData.address.district,
    street: userData.address.street,
    number: userData.address.number,
    zipCode: userData.address.zipCode,
    complement: userData.address.complement,
  });
  await addressRepository.save(addresses);

  const position: Position = positonsRepository.create({
    fixed: userData.positions.fixed,
    leftwing: userData.positions.leftwing,
    goalkeeper: userData.positions.goalkeeper,
    rightwing: userData.positions.rightwing,
    target: userData.positions.target,
  });
  await positonsRepository.save(position);

  const hashedPassword: string = await hash(userData.password, 10);
  const newUser: User = new User();
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
  newUser.address = addresses;

  const user: User = userRepository.create(newUser);
  await userRepository.save(user);

  const userCreated: User | null = await userRepository.findOneBy({
    id: user.id,
  });

  return userCreated!;
};

export default createUserServices;
