import { Request, Response } from 'express';
import listTeamService from '../../services/teams/listTeam.service';

const listTeamController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const team = await listTeamService(id);
  return res.json(team);
};

export default listTeamController;
