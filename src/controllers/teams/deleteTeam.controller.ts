import { Request, Response } from 'express';
import deleteTeamService from '../../services/teams/deleteTeam.service';

const deleteTeamController = async (req: Request, res: Response) => {
  const id = req.params.id;
  await deleteTeamService(id);
  return res.json({
    message: 'Time deletado com sucesso!',
  });
};

export default deleteTeamController;
