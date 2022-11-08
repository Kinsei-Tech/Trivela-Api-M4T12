import AppDataSource from '../../data-source';
import { Participant } from '../../entities/participant.entity';
import { AppError } from '../../errors/appError';

const deleteParticipantService = async (id: string) => {
  const participantRepository = AppDataSource.getRepository(Participant);

  await participantRepository.delete(id);
};

export default deleteParticipantService;
