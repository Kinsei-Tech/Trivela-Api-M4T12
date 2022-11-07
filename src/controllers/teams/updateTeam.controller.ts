import { Request, Response } from 'express';
import { Team } from '../../entities/team.entity';
import { ITeamUpdate } from '../../interface/teams/teams';
import updateTeamService from '../../services/teams/updateTeam.service';

const updateTeamController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const data: ITeamUpdate = req.body;

  const updatedTeam = await updateTeamService(data, id);
  if (updatedTeam instanceof Team) {
    return res.json({
      message: 'Time editado com sucesso!',
      team: updatedTeam,
    });
  }
  return res.json(updatedTeam);
};

export default updateTeamController;
