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
  const { positions, city, description, fieldsId, maxAge, maxWeight, state } =
    data;
  const teamRepository = AppDataSource.getRepository(Team);
  const positionRepository = AppDataSource.getRepository(Position);
  const fieldRepository = AppDataSource.getRepository(Field);

  const findTeam = await teamRepository.findOneBy({ id });

  if (!findTeam) {
    throw new AppError(404, 'Time não encontrado');
  }
  const positionsTeam = await positionRepository.findOneBy({
    id: findTeam.positions.id,
  });

  const keys = Object.keys(data);
  if (
    keys.includes('id') ||
    keys.includes('userId') ||
    keys.includes('isActive') ||
    keys.includes('participantsId') ||
    keys.includes('name')
  ) {
    throw new AppError(
      401,
      'Valores como id, userId e name não podem ser alterados. Valores como isActive e participantsId não podem ser alterados nesta rota'
    );
  }

  if (positions) {
    await positionRepository.update(positionsTeam!.id, {
      fixed: positions.fixed,
      goalkeeper: positions.goalkeeper,
      leftwing: positions.leftwing,
      rightwing: positions.rightwing,
      target: positions.target,
    });
  }

  if (fieldsId) {
    for (const id of fieldsId) {
      const field = await fieldRepository.findOneBy({ id });
      findTeam.fields = findTeam.fields.concat(field!);
      await teamRepository.save(findTeam);
    }
  }

  await teamRepository.update(id, {
    city: city ? city : findTeam.city,
    description: description ? description : findTeam.description,
    maxAge: maxAge ? maxAge : findTeam.maxAge,
    maxWeight: maxWeight ? maxWeight : findTeam.maxWeight,
    state: state ? state : findTeam.state,
  });

  const updatedTeam = await teamRepository.findOneBy({ id });

  return updatedTeam!;
};

export default updateTeamService;
