import * as yup from 'yup';

export const createAdmSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
});

export const updateAdmSchema = yup.object().shape({
  name: yup.string(),
  email: yup.string(),
  password: yup.string(),
});
