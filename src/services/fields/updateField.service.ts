import AppDataSource from '../../data-source';
import { Field } from '../../entities/fields.entity';
import { AppError } from '../../errors/appError';

const updateFieldService = async (dataField: Partial<Field>, id: string):Promise<boolean> => {
  const fieldsRepository = AppDataSource.getRepository(Field);
  const fields = await fieldsRepository.findOneBy({ id });

  const data = Object.keys(dataField);

  if (
    data.includes('id') ||
    data.includes('ownerId') ||
    data.includes('isActive')
  ) {
    throw new AppError(401, 'Not possible update id, ownerId or isActive');
  }

  await fieldsRepository.update(fields!.id, {
    ...fields,
    ...dataField
  })

  return true
};
export default updateFieldService;
