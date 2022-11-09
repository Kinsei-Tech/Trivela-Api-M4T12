import AppDataSource from '../../../data-source';
import { Owner } from '../../../entities/owner.entity';

const adminListOwnersService = async (): Promise<Owner[]> => {
  const ownerRepository = AppDataSource.getRepository(Owner);
  const owners = await ownerRepository.find();

  return owners;
};

export default adminListOwnersService;
