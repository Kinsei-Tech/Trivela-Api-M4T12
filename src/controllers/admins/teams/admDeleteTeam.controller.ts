import { Request, Response } from 'express';
import admDeleteTeamService from '../../../services/admins/teams/admDeleteTeam.service';

const admDeleteTeamController = async (req: Request, res: Response) => {
  const id = req.params.id;
  await admDeleteTeamService(id);
  return res.json({
    message: 'Time deletado com sucesso!',
  });
};

export default admDeleteTeamController;
