import AppDataSource from '../../data-source';
import { Address } from '../../entities/address.entity';
import { Field } from '../../entities/fields.entity';
import { Owner } from '../../entities/owner.entity';
import { IFieldRequest } from '../../interface/fields/fields';

const createFieldService = async (fieldData: IFieldRequest): Promise<Field> => {
  const fieldsRepository = AppDataSource.getRepository(Field);
  //  const ownersRepository = AppDataSource.getRepository(Owner);
  //   const adressesRepository = AppDataSource.getRepository(Adress);

  const newField = new Field();
  newField.name = fieldData.name;
  // newField.owners = ownersRepository
  // newField.adresses = adressesRepository

  const field: Field = fieldsRepository.create(newField);
  await fieldsRepository.save(field);

  return field;
};
export default createFieldService;
