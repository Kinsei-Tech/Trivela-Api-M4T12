import { Request, Response } from 'express';
import admDeactivateTeamService from '../../../services/admins/teams/admDeactivateTeam.service';

const admDeactivateTeamController = async (req: Request, res: Response) => {
  const id = req.params.id;
  await admDeactivateTeamService(id);
  return res.json({
    message: 'Time desativado com sucesso!',
  });
};

export default admDeactivateTeamController;
