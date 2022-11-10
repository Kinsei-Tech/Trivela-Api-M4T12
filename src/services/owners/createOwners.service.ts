import AppDataSource from '../../data-source';
import { Owner } from '../../entities/owner.entity';
import { IOwnerRequest } from '../../interface/owners';
import { AppError } from '../../errors/appError';
import { hash } from 'bcryptjs';

const createOwnerService = async ({
  name,
  email,
  password,
}: IOwnerRequest): Promise<Owner> => {
  const ownerRepository = AppDataSource.getRepository(Owner);
  const owners = await ownerRepository.find();
  const emailAlreadyExists = owners.find((owner) => owner.email === email);
  if (emailAlreadyExists) {
    throw new AppError(400, 'Email Already exists');
  }
  const hashedPassword = await hash(password, 10);
  const owner = ownerRepository.create({
    email,
    name,
    password: hashedPassword,
  });
  await ownerRepository.save(owner);
  return owner;
};
export default createOwnerService;
