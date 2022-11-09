import { Repository } from 'typeorm';
import AppDataSource from '../../data-source';
import { Participant } from '../../entities/participant.entity';
import { Request } from '../../entities/requests.entity';
import { Team } from '../../entities/team.entity';
import { User } from '../../entities/user.entity';
import { IRequestUpdate } from '../../interface/requests/requests';

const updatedRequestService = async (
  id: string,
  {
    status
  }: IRequestUpdate
): Promise<Request | null> => {
  const requestRepository: Repository<Request> = AppDataSource.getRepository(Request);
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const teamRepository: Repository<Team> = AppDataSource.getRepository(Team);
  const participantRepository: Repository<Participant> = AppDataSource.getRepository(Participant);
  let findRequest: Request | null = await requestRepository.findOne({
    where : {id : id}, relations : ["user", "teams"] 
  });

  if (status == 2) {
    
    await requestRepository.update(id, {
      status: status ? status : findRequest?.status,
    });

    const user = await userRepository.findOneBy({ id : findRequest?.user.id });
    const team = await teamRepository.findOneBy({ id : findRequest?.teams.id });
    const participant = new Participant
    participant.position = findRequest!.positions;
    await participantRepository.save(participant);

    await teamRepository.update(team!.id, {
      
    })
  }

  if (status == 3){
    await requestRepository.update(id, {
      status: status? status : findRequest?.status
    })
  }

  findRequest = await requestRepository.findOneBy({
    id,
  });

  return findRequest;
};

export default updatedRequestService;