import AppDataSource from '../../data-source';
import { Adress } from '../../entities/adress.entity';
import { Field } from '../../entities/fields.entity';
import { Owner } from '../../entities/owner.entity';
import { AppError } from '../../errors/appError';
import { IFieldRequest } from '../../interface/fields/fields';

const createFieldService = async (fieldData: IFieldRequest): Promise<Field> => {
  const fieldsRepository = AppDataSource.getRepository(Field);
  const ownersRepository = AppDataSource.getRepository(Owner);
  const adressesRepository = AppDataSource.getRepository(Adress);

  const getOwner = await ownersRepository.findOneBy({ id: fieldData.ownerId });

  if (!getOwner) {
    throw new AppError(404, 'Owner not found!');
  }

  const newAdresses = adressesRepository.create(fieldData.address);
  await adressesRepository.save(newAdresses);

  const newField = new Field();
  newField.name = fieldData.name;
  newField.isActive = fieldData.isActive;
  newField.owners = getOwner;
  newField.adresses = newAdresses;

  const field: Field = fieldsRepository.create(newField);
  await fieldsRepository.save(field);

  return field;
};
export default createFieldService;
