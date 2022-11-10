import { Request, Response } from 'express';
import listTeamsService from '../../services/teams/listTeams.service';

const listTeamsController = async (req: Request, res: Response) => {
  const teams = await listTeamsService();
  return res.json(teams);
};

export default listTeamsController;
