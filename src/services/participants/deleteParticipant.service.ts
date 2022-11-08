import AppDataSource from '../../data-source';
import { Participant } from '../../entities/participant.entity';
import { AppError } from '../../errors/appError';

const deleteParticipantService = async (id: string) => {
  const participantRepository = AppDataSource.getRepository(Participant);

  const findParticipant = await participantRepository.findOneBy({ id });

  if (!findParticipant) {
    throw new AppError(404, 'Participante não encontrado');
  }

  await participantRepository.delete(id);
};

export default deleteParticipantService;
