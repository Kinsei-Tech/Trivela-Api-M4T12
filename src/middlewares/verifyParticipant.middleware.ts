/*import { NextFunction, Request, Response } from 'express';
import AppDataSource from '../data-source';
import { Participant } from '../entities/participant.entity';
import { AppError } from '../errors/appError';
import jwt from 'jsonwebtoken';

const verifyParticipantMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let usedId;
  if(req.params.)
  const userId: string = req.body.userId;
  const participantRepository = AppDataSource.getRepository(Participant);

  const findParticipant = await participantRepository.findOneBy({
    user: { id: userId },
  });
  if (!findParticipant) {
    throw new AppError(404, 'Participante não encontrado');
  }

  let token = req.headers.authorization;
  if (token) {
    token = token?.split(' ')[1];

    jwt.verify(
      token,
      process.env.SECRET_KEY as string,
      (error, decoded: any) => {
        req.participant = {
          id: findParticipant.id,
        };
      }
    );
    next();
  }
};

export default verifyParticipantMiddleware; */
