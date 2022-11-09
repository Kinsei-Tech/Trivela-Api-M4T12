import AppDataSource from '../../data-source';
import { Field } from '../../entities/fields.entity';
import { AppError } from '../../errors/appError';

const listFieldsService = async (loggedUser: string) => {
  const fieldsRepository = AppDataSource.getRepository(Field);

  // const field = await fieldsRepository.find();

  // const fieldsOwner = field.filter((field) => field.owner.id === loggedUser);

  const field = await fieldsRepository.findOne({
    where: {
      owner: {
        id: loggedUser,
      },
    },
    relations: {
      address: true,
    },
  });

  if (!field) {
    throw new AppError(400, 'Field not found');
  }

  return field;
};
export default listFieldsService;
