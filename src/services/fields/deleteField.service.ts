import AppDataSource from '../../data-source';
import { Field } from '../../entities/fields.entity';

const deleteFieldService = async (id: string): Promise<boolean> => {
  const fieldRepository = AppDataSource.getRepository(Field);
  const field: Field | null = await fieldRepository.findOneBy({ id });
  await fieldRepository.delete(field!.id);

  return true;
};
export default deleteFieldService;
