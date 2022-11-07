import AppDataSource from '../../data-source';
import { Team } from '../../entities/team.entity';

const listTeamsService = async () => {
  const teamsRepository = AppDataSource.getRepository(Team);
  const teams = await teamsRepository.find();

  return teams;
};

export default listTeamsService;
