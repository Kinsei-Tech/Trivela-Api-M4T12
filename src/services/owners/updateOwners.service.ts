import AppDataSource from '../../data-source';
import { AppError } from '../../errors/appError';
import { IOwnerUpdate } from '../../interface/owners';
import { Owner } from '../../entities/owner.entity';
import { hash } from 'bcryptjs';

const updateOwnerService = async (ownerData: IOwnerUpdate, id: string) => {
  const ownerRepository = AppDataSource.getRepository(Owner);
  const findOwner = await ownerRepository.findOneBy({ id });
  if (!findOwner) {
    throw new AppError(404, 'User not found');
  }

  const data = Object.keys(ownerData);
  
  if (data.includes('id') || data.includes('isActive')) {
    throw new AppError(401, 'Not possible update isActive or id');
  }
  await ownerRepository.update(id, {
    name: ownerData.name ? ownerData.name : findOwner.name,
    password: ownerData.password
      ? await hash(ownerData.password, 10)
      : findOwner.password,
  });
  const owner = await ownerRepository.findOneBy({ id });
  return owner;
};
export default updateOwnerService;
