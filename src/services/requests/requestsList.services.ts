import AppDataSource from '../../data-source';
import { Request } from '../../entities/requests.entity';

const requestsListService = async (id: string): Promise<Request[]> => {
  const requestRepository = AppDataSource.getRepository(Request);

  const requests = await requestRepository.find();

  return requests;
};

export default requestsListService;