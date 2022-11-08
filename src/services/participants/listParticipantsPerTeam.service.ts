import AppDataSource from '../../data-source';
import { Team } from '../../entities/team.entity';
import { AppError } from '../../errors/appError';

const listParticipantsPerTeamService = async (teamId: string) => {
  const teamRepository = AppDataSource.getRepository(Team);

  const findTeam = await teamRepository.findOneBy({ id: teamId });

  if (!findTeam) {
    throw new AppError(404, 'Time não encontrado');
  }

  const listParticipants = await teamRepository.findOne({
    where: {
      id: teamId,
    },
    relations: {
      participants: true,
    },
  });

  return listParticipants!.participants!;
};

export default listParticipantsPerTeamService;
