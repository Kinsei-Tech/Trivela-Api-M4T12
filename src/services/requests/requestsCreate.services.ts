import AppDataSource from '../../data-source';
import { User } from '../../entities/user.entity';
import { Request } from '../../entities/requests.entity';
import { AppError } from '../../errors/appError';
import { IRequest } from '../../interface/requests/requests';
import { Team } from '../../entities/team.entity';

const requestsCreateService = async (data: IRequest): Promise<Request> => {
  console.log(data)
  const requestsInfoRepository = AppDataSource.getRepository(Request);
  const userInfoRepository = AppDataSource.getRepository(User);
  const teamInfoRepository = AppDataSource.getRepository(Team);

  const getTeam = await teamInfoRepository.findOneBy({
    id: data.teamId,
  });

  if (!getTeam) {
    throw new AppError(404, 'Team not found');
  }
  console.log(getTeam)
  const userExist = await userInfoRepository.findOneBy({
    id: data.userId,
  });

  if (!userExist) {
    throw new AppError(404, 'You already is on this team');
  }

  const newRequests = new Request();
  newRequests.positions = data.position;
  newRequests.user = userExist;
  newRequests.teams = getTeam;
  console.log(newRequests);


  requestsInfoRepository.create(newRequests);
  await requestsInfoRepository.save(newRequests);

  return newRequests;
};
export default requestsCreateService;
