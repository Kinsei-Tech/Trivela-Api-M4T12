import AppDataSource from '../../data-source';
import { Team } from '../../entities/team.entity';
import { AppError } from '../../errors/appError';
import { ITeam } from '../../interface/teams/teams';

const listTeamService = async (id: string): Promise<ITeam> => {
  const teamRepository = AppDataSource.getRepository(Team);
  const team = await teamRepository.findOneBy({ id });

  if (!team) {
    throw new AppError(404, 'Time não encontrado');
  }

  return team;
};

export default listTeamService;
