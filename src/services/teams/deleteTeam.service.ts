import AppDataSource from '../../data-source';
import { Team } from '../../entities/team.entity';
import { AppError } from '../../errors/appError';

const deleteTeamService = async (id: string) => {
  const teamRepository = AppDataSource.getRepository(Team);

  const findTeam = await teamRepository.findOneBy({
    id,
  });

  if (!findTeam) {
    throw new AppError(404, 'Time não encontrado');
  }

  await teamRepository.delete(id);
};

export default deleteTeamService;
