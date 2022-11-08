import { Request, Response } from 'express';
import { Participant } from '../../entities/participant.entity';
import { IParticipantUpdate } from '../../interface/participants/participants';
import updateParticipantService from '../../services/participants/updateParticipant.service';

const updateParticipantController = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const data: IParticipantUpdate = req.body;

  const updatedParticipant = await updateParticipantService(userId, data);
  if (updatedParticipant instanceof Participant) {
    return res.json({
      message: 'Posição do participante alterada com sucesso',
      participant: updatedParticipant,
    });
  }
  return res.json(updatedParticipant);
};

export default updateParticipantController;
