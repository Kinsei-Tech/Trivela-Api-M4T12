import AppDataSource from '../../../data-source';
import { Team } from '../../../entities/team.entity';
import { AppError } from '../../../errors/appError';

const admDeactivateTeamService = async (id: string) => {
  const teamRepository = AppDataSource.getRepository(Team);

  const findTeam = await teamRepository.findOneBy({ id });

  if (!findTeam) {
    throw new AppError(404, 'Time não encontrado');
  }
  if (findTeam.isActive === false) {
    throw new AppError(400, 'O time já está desativado');
  }

  await teamRepository.update(id, {
    isActive: false,
  });
};

export default admDeactivateTeamService;
