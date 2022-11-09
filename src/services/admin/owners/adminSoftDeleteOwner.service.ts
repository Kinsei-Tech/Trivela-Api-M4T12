import AppDataSource from '../../../data-source';
import { Owner } from '../../../entities/owner.entity';
import { AppError } from '../../../errors/appError';

const adminSoftDeleteOwnerService = async (id: string): Promise<Owner> => {
  const ownerRepository = AppDataSource.getRepository(Owner);
  const findOwner = await ownerRepository.findOneBy({ id });

  if (!findOwner) {
    throw new AppError(404, 'User not found');
  }
  if (!findOwner.isActive) {
    throw new AppError(400, 'Unable to delete inactive user');
  }

  findOwner.isActive = false;
  await ownerRepository.save(findOwner);

  return findOwner;
};

export default adminSoftDeleteOwnerService;
