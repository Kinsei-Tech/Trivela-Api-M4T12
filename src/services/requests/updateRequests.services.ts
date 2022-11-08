/*import { Repository } from 'typeorm';
import AppDataSource from '../../data-source';
import { Position } from '../../entities/position.entity';
import { Request } from '../../entities/requests.entity';
import { IRequestUpdate } from '../../interface/requests/requests';

const updatedRequestService = async (
  id: string,
  {
    positions,
    status
  }: IRequestUpdate
): Promise<Request | null> => {
  const RequestRepository: Repository<Request> = AppDataSource.getRepository(Request);
  const positionsRepository: Repository<Position> =
    AppDataSource.getRepository(Position);
  let findRequest: Request | null = await RequestRepository.findOneBy({
    id,
  });
  
  const positionsRequest = await positionsRepository.findOneBy({
    id: findRequest.positions.id,
  });

  await positionsRepository.update(positionsRequest!.id, {
    fixed: positions?.fixed ? positions.fixed : positionsRequest?.fixed,
    goalkeeper: positions?.goalkeeper
      ? positions.goalkeeper
      : positionsRequest?.goalkeeper,
    leftwing: positions?.leftwing
      ? positions.leftwing
      : positionsRequest?.leftwing,
    rightwing: positions?.rightwing
      ? positions.rightwing
      : positionsRequest?.rightwing,
    target: positions?.target ? positions.target : positionsRequest?.target,
  });

  await RequestRepository.update(id, {
    status: status ? status : findRequest.status,
    positions: positions ? positions : findRequest.positions,
  });
  findRequest = await RequestRepository.findOneBy({
    id,
  });

  return findRequest;
};

export default updatedRequestService;
*/
