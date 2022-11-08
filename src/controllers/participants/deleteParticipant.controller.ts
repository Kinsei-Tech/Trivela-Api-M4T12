import { Request, Response } from 'express';
import deleteParticipantService from '../../services/participants/deleteParticipant.service';

const deleteParticipantController = async (req: Request, res: Response) => {
  const id = req.params.id;
  await deleteParticipantService(id);
  return res.json({
    message: 'Participante deletado com sucesso!',
  });
};

export default deleteParticipantController;
