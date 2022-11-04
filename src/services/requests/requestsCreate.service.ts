import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { Team } from "../../entities/teams.entity";
import { Request } from "../../entities/requests.entity";
import { AppError } from "../../errors/appError";
import { IRequest } from "../../interfaces/requests/index";

const requestsCreateService = async (
  data: IRequest
): Promise<Request> => {
  const requestsInfoRepository = AppDataSource.getRepository(Request);
  const userInfoRepository = AppDataSource.getRepository(User);
  const teamInfoRepository = AppDataSource.getRepository(Team);

  if (!data) {
    throw new AppError("Check the required fields");
  }
  const getTeam = await teamInfoRepository.findOneBy({
    id: data.teamId,
  });

  if (!getTeam) {
    throw new AppError("Team not found", 404);
  }
  const userExist = await userInfoRepository.findOne({
    where: data.userId,
  });

  if (userExist) {
    throw new AppError("You already is on this team");
  }

  const newUser = userInfoRepository.create(data.userId);
  await userInfoRepository.save(newUser);

  const newRequests = new Request();
  newRequests.status = data.status;
  newRequests.position = data.position;
  newRequests.userId = newUser;
  newRequests.teamId = getTeam;

  requestsInfoRepository.create(newRequests);
  await requestsInfoRepository.save(newRequests);

  return newRequests;
};
export default requestsCreateService;