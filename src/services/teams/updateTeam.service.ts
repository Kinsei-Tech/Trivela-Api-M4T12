import AppDataSource from '../../data-source';
import { Field } from '../../entities/fields.entity';
import { Position } from '../../entities/position.entity';
import { Team } from '../../entities/team.entity';
import { AppError } from '../../errors/appError';
import { ITeam, ITeamRequest, ITeamUpdate } from '../../interface/teams/teams';

const updateTeamService = async (
  data: ITeamUpdate,
  id: string
): Promise<ITeam> => {
  const {
    positions,
    city,
    description,
    fieldsId,
    maxAge,
    maxWeight,
    name,
    state,
  } = data;
  const teamRepository = AppDataSource.getRepository(Team);
  const positionRepository = AppDataSource.getRepository(Position);
  const fieldRepository = AppDataSource.getRepository(Field);

  const findTeam = await teamRepository.findOneBy({ id });

  if (!findTeam) {
    throw new AppError(404, 'Time não encontrado');
  }
  const keys = Object.keys(data);
  if (
    keys.includes('id') ||
    keys.includes('userId') ||
    keys.includes('isActive') ||
    keys.includes('participantsId')
  ) {
    throw new AppError(
      401,
      'Valores como id e userId não podem ser alterados. Valores como isActive e participantsId não podem ser alterados nesta rota'
    );
  }

  let updatedPositions: Position;
  if (positions) {
    const { fixed, goalkeeper, leftwing, rightwing, target } = positions;
    updatedPositions = positionRepository.create({
      fixed,
      goalkeeper,
      leftwing,
      rightwing,
      target,
    });
    await positionRepository.save(updatedPositions);
  }

  let updatedFields: Field[] = [];
  if (fieldsId) {
    for (const id of fieldsId) {
      const field = await fieldRepository.findOneBy({ id });
      field && updatedFields.push(field);
    }
  }

  const treatedData: ITeamUpdate = {
    city,
    description,
    maxAge,
    maxWeight,
    name,
    state,
    fields: updatedFields.length > 0 ? updatedFields : undefined,
    positions: updatedPositions!,
  };

  await teamRepository.update(id, {
    ...findTeam,
    ...treatedData,
  });

  return findTeam;
};

export default updateTeamService;
