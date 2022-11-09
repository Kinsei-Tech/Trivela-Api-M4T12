import AppDataSource from '../../data-source';
import { Address } from '../../entities/address.entity';
import { Field } from '../../entities/fields.entity';
import { AppError } from '../../errors/appError';

const updateFieldService = async (
  update: Partial<Field>,
  id: string,
  loggedUser: string
): Promise<Field | null> => {
  const fieldsRepository = AppDataSource.getRepository(Field);
  const addressRepository = AppDataSource.getRepository(Address);

  let fields = await fieldsRepository.findOne({
    where: {
      id,
    },
    relations: {
      address: true,
    },
  });
  const address = await addressRepository.findOneBy({
    id: fields?.address.id,
  });

  const data = Object.keys(update);

  if (
    data.includes('id') ||
    data.includes('ownerId') ||
    data.includes('isActive')
  ) {
    throw new AppError(401, 'Not possible update id, ownerId or isActive');
  }

  if (update.address) {
    await addressRepository.update(address!.id, { ...update.address });
  }

  const updateField = { ...update };
  delete updateField.address;

  await fieldsRepository.update(fields!.id, {
    ...updateField,
  });

  await addressRepository.update(fields!.address.id, { ...update.address });

  fields = await fieldsRepository.findOne({
    where: {
      id,
    },
    relations: {
      address: true,
    },
  });

  return fields;
};
export default updateFieldService;
