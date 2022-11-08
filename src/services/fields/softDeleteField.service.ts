import AppDataSource from '../../data-source';
import { Field } from '../../entities/fields.entity';
import { AppError } from '../../errors/appError';

const softDeleteFieldService = async (id: string): Promise<boolean> => {
  const fieldRepository = AppDataSource.getRepository(Field);
  const field = await fieldRepository.findOneBy({ id });

  if (!field) {
    throw new AppError(404, 'Field not found');
  }

  if (!field?.isActive) {
    throw new AppError(304, 'Unable to delete inactive field');
  }

  field.isActive = false;

  return true;
};
export default softDeleteFieldService;
