import { Repository } from 'typeorm';
import AppDataSource from '../../data-source';
import { Request } from '../../entities/requests.entity';
import { AppError } from '../../errors/appError';

const deleteRequestService = async (id: string): Promise<void> => {
  const RequestRespository: Repository<Request> = AppDataSource.getRepository(Request);
  const deleteRequest: Request | null = await RequestRespository.findOneBy({ id });
  if (!deleteRequest) {
    throw new AppError(404, 'Request ID not found');
  }

  await RequestRespository.delete(id);

  return;
};
export default deleteRequestService;
