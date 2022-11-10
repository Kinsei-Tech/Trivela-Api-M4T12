import * as yup from 'yup';

export const createPositionsSchema = yup.object({
  target: yup.boolean().required(),
  goalkeeper: yup.boolean().required(),
  leftwing: yup.boolean().required(),
  rightwing: yup.boolean().required(),
  fixed: yup.boolean().required(),
});

export const updatePositionsSchema = yup.object({
  target: yup.boolean(),
  goalkeeper: yup.boolean(),
  leftwing: yup.boolean(),
  rightwing: yup.boolean(),
  fixed: yup.boolean(),
});
