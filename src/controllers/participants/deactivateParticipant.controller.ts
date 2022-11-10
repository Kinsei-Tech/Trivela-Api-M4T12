import { Request, Response } from 'express';
import deactivateParticipantService from '../../services/participants/deactivateParticipant.service';

const deactivateParticipantController = async (req: Request, res: Response) => {
  const id = req.participant.id;
  await deactivateParticipantService(id);
  return res.json({
    message: 'Participante desativado com sucesso!',
  });
};

export default deactivateParticipantController;
