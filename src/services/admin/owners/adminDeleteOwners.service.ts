import AppDataSource from '../../../data-source';
import { Owner } from '../../../entities/owner.entity';
import { AppError } from '../../../errors/appError';

const adminDeleteOwnerService = async (id: string): Promise<void> => {
  const ownerRepository = AppDataSource.getRepository(Owner);

  const findOwner = await ownerRepository.findOneBy({ id });

  if (!findOwner) {
    throw new AppError(404, 'User not found');
  }

  await ownerRepository.delete(id);
};

export default adminDeleteOwnerService;
