import AppDataSource from '../../data-source';
import { Address } from '../../entities/address.entity';
import { Field } from '../../entities/fields.entity';
import { Owner } from '../../entities/owner.entity';
import { AppError } from '../../errors/appError';
import { IField, IFieldRequest } from '../../interface/fields/fields';

const createFieldService = async (
  fieldData: IFieldRequest,
  id: string
): Promise<Field> => {
  const fieldsRepository = AppDataSource.getRepository(Field);
  const ownersRepository = AppDataSource.getRepository(Owner);
  const adressesRepository = AppDataSource.getRepository(Address);

  const getOwner = await ownersRepository.findOneBy({ id: id });

  if (!getOwner) {
    throw new AppError(404, 'Owner not found!');
  }

  const fields: Field[] = await fieldsRepository.find();

  const nameAlreadyExists: IField | undefined = fields.find(
    (field) => field.name === fieldData.name
  );

  if (nameAlreadyExists) {
    throw new AppError(400, 'Name already exists');
  }

  const newAdresses = adressesRepository.create(fieldData.address);
  await adressesRepository.save(newAdresses);

  const newField = new Field();
  newField.name = fieldData.name;
  newField.isActive = fieldData.isActive;
  newField.owner = getOwner;
  newField.address = newAdresses;

  const field: Field = fieldsRepository.create(newField);
  await fieldsRepository.save(field);

  return field;
};
export default createFieldService;
