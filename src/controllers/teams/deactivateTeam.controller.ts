import { Request, Response } from 'express';
import deactivateTeamService from '../../services/teams/deactivateTeam.service';

const deactivateTeamController = async (req: Request, res: Response) => {
  const id = req.params.id;
  await deactivateTeamService(id);
  return res.json({
    message: 'Time desativado com sucesso!',
  });
};

export default deactivateTeamController;
