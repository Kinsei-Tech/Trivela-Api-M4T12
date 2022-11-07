import AppDataSource from '../../data-source';
import { Field } from '../../entities/fields.entity';

const listFieldsService = async (): Promise<Field[]> => {
  const fieldsRepository = AppDataSource.getRepository(Field);

  const field = await fieldsRepository.find();

  return field;
};
export default listFieldsService;
