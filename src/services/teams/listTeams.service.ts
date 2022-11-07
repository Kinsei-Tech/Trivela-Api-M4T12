import AppDataSource from '../../data-source';
import { Team } from '../../entities/team.entity';
import { ITeam } from '../../interface/teams/teams';

const listTeamsService = async (): Promise<ITeam[]> => {
  const teamRepository = AppDataSource.getRepository(Team);
  const teams = await teamRepository.find();
  return teams;
};

export default listTeamsService;
