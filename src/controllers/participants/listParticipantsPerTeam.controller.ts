import { Request, Response } from 'express';
import listParticipantsPerTeamService from '../../services/participants/listParticipantsPerTeam.service';

const listParticipantsPerTeamController = async (
  req: Request,
  res: Response
) => {
  const teamId = req.params.id;
  const participantsList = await listParticipantsPerTeamService(teamId);
  return res.json(participantsList);
};

export default listParticipantsPerTeamController;
