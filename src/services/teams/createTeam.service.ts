import AppDataSource from '../../data-source';
import { Field } from '../../entities/fields.entity';
import { Team } from '../../entities/team.entity';
import { User } from '../../entities/user.entity';
import { ITeam, ITeamRequest } from '../../interface/teams/teams';
import { IField } from '../../interface/fields/fields';
import { Position } from '../../entities/position.entity';
import { AppError } from '../../errors/appError';

const createTeamService = async (
  teamData: ITeamRequest,
  userId: string
): Promise<ITeam> => {
  const {
    city,
    description,
    fieldsId,
    maxAge,
    maxWeight,
    name,
    positions,
    state,
  } = teamData;
  const { fixed, goalkeeper, leftwing, rightwing, target } = positions;
  const teamRepository = AppDataSource.getRepository(Team);
  const userRepository = AppDataSource.getRepository(User);
  const fieldRepository = AppDataSource.getRepository(Field);
  const positionsRepository = AppDataSource.getRepository(Position);

  const user = await userRepository.findOneBy({ id: userId });

  const findName = await teamRepository.findOneBy({ name });
  if (findName) {
    throw new AppError(
      401,
      `There is already a team with the name '${findName.name}'. Please choose another one.`
    );
  }

  let fields: IField[] = [];
  if (fieldsId) {
    for (const id of fieldsId) {
      const field = await fieldRepository.findOneBy({ id });
      field && fields.push(field);
    }
  }

  const createPositions = positionsRepository.create({
    fixed,
    goalkeeper,
    leftwing,
    rightwing,
    target,
  });
  await positionsRepository.save(createPositions);

  const team = teamRepository.create({
    positions: createPositions,
    isActive: true,
    city,
    description,
    name,
    maxAge,
    maxWeight,
    fields,
    state,
    user: user!,
  });
  await teamRepository.save(team);

  return team;
};

export default createTeamService;
