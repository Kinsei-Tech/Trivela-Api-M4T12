import AppDataSource from '../../data-source';
import { Participant } from '../../entities/participant.entity';
import { Team } from '../../entities/team.entity';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/appError';
import {
  IParticipant,
  IParticipantRequest,
} from '../../interface/participants/participants';

const createParticipantService = async (
  data: IParticipantRequest
): Promise<IParticipant> => {
  const { position, teamId, userId } = data;

  const userRepository = AppDataSource.getRepository(User);
  const teamRepository = AppDataSource.getRepository(Team);
  const participantRepository = AppDataSource.getRepository(Participant);

  const findUser = await userRepository.findOneBy({ id: userId });
  if (!findUser) {
    throw new AppError(404, 'Usuário não encontrado');
  }

  const findTeam = await teamRepository.findOneBy({ id: teamId });
  if (!findTeam) {
    throw new AppError(404, 'Time não encontrado');
  }

  const participant = participantRepository.create({
    team: findTeam,
    user: findUser,
    position,
  });
  await participantRepository.save(participant);

  return participant;
};

export default createParticipantService;
