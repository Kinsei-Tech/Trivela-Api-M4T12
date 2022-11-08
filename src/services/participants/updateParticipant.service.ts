import AppDataSource from '../../data-source';
import { Participant } from '../../entities/participant.entity';
import { AppError } from '../../errors/appError';
import {
  IParticipant,
  IParticipantUpdate,
} from '../../interface/participants/participants';

const updateParticipantService = async (
  id: string,
  data: IParticipantUpdate
): Promise<IParticipant> => {
  const participantRepository = AppDataSource.getRepository(Participant);

  const findParticipant = await participantRepository.findOneBy({
    id,
  });

  const keys = Object.keys(data);
  if (
    keys.includes('id') ||
    keys.includes('isActive') ||
    keys.includes('teamId') ||
    keys.includes('userId')
  ) {
    throw new AppError(401, 'Não é possível editar esses valores');
  }

  await participantRepository.update(findParticipant!.id, {
    position: data.position ? data.position : findParticipant!.position,
  });

  const participantId = findParticipant!.id;
  const participant = await participantRepository.findOneBy({
    id: participantId!,
  });

  return participant!;
};

export default updateParticipantService;
