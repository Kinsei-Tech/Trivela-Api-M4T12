import { Request, Response } from 'express';
import { ITeamRequest } from '../../interface/teams/teams';
import createTeamService from '../../services/teams/createTeam.service';

const createTeamController = async (req: Request, res: Response) => {
  const teamData: ITeamRequest = req.body;
  const userId: string = req.user.id;
  const team = await createTeamService(teamData, userId);
  return res.status(201).json({
    message: 'Time criado com sucesso!',
    team: team,
  });
};

export default createTeamController;
