import { Request, Response } from 'express';
import listTeamService from '../../services/teams/listTeam.service';

const listTeamController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const team = await listTeamService(id);
  return res.status(200).json(team);
};

export default listTeamController;
