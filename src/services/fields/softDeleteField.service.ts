import AppDataSource from '../../data-source';
import { Field } from '../../entities/fields.entity';
import { AppError } from '../../errors/appError';

const softDeleteFieldService = async (id: string): Promise<void> => {
  const fieldRepository = AppDataSource.getRepository(Field);
  const field: Field | null = await fieldRepository.findOneBy({ id });

  if (!field) {
    throw new AppError(404, 'Field not found');
  }

  if (field.isActive === false) {
    throw new AppError(304, 'Unable to delete inactive field');
  }

  await fieldRepository.update(id, {
    isActive: false,
  });
};
export default softDeleteFieldService;
