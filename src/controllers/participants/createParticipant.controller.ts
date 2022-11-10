import { Request, Response } from 'express';
import { IParticipantRequest } from '../../interface/participants/participants';
import createParticipantService from '../../services/participants/createParticipant.service';

const createParticipantController = async (req: Request, res: Response) => {
  const data: IParticipantRequest = req.validatedBody;
  const participant = await createParticipantService(data);
  return res.status(201).json(participant);
};

export default createParticipantController;
