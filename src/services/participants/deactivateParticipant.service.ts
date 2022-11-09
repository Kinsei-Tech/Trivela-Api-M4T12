import AppDataSource from '../../data-source';
import { Participant } from '../../entities/participant.entity';
import { AppError } from '../../errors/appError';

const deactivateParticipantService = async (id: string) => {
  const participantRepository = AppDataSource.getRepository(Participant);

  const findParticipant = await participantRepository.findOneBy({ id });

  if (findParticipant && findParticipant.isActive === false) {
    throw new AppError(400, 'O participante já está desativado');
  }

  await participantRepository.update(id, {
    isActive: false,
  });
};

export default deactivateParticipantService;
