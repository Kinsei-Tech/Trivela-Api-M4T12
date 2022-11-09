import { NextFunction, Request, Response } from 'express';
import AppDataSource from '../data-source';
import { Team } from '../entities/team.entity';
import { AppError } from '../errors/appError';

const isTeamOwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user.id;
  const teamId = req.params.id;

  const teamsRepository = AppDataSource.getRepository(Team);

  const findTeam = await teamsRepository.findOneBy({ id: teamId });
  if (!findTeam) {
    throw new AppError(404, 'Time não encontrado');
  }

  if (findTeam.user.id !== userId) {
    throw new AppError(401, 'Apenas o dono do time pode executar essa ação');
  }

  next();
};

export default isTeamOwnerMiddleware;
