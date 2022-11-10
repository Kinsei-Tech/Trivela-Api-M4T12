import * as yup from 'yup';

export const createRequestSchema = yup.object().shape({
  position: yup.number().required(),
  userId: yup.string().required(),
  teamId: yup.string().required(),
});

export const updateRequestSchema = yup.object().shape({
  position: yup.number().required(),
});
