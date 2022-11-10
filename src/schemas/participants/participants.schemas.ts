import * as yup from 'yup';

export const createParticipantSchema = yup.object().shape({
  position: yup.number().required(),
  teamId: yup.string().required(),
  userId: yup.string().required(),
});

export const updateParticipantSchema = yup.object().shape({
  position: yup.number().required(),
});
