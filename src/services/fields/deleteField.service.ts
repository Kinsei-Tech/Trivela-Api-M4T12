import AppDataSource from '../../data-source';
import { Field } from '../../entities/fields.entity';
import { AppError } from '../../errors/appError';

const deleteFieldService = async (id: string): Promise<boolean> => {
  const fieldRepository = AppDataSource.getRepository(Field);
  const field = await fieldRepository.findOneBy({ id });
  await fieldRepository.delete(field!.id);

  return true;
};
export default deleteFieldService;
