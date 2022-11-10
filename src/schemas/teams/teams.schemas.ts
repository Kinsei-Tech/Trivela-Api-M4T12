import * as yup from 'yup';
import {
  createPositionsSchema,
  updatePositionsSchema,
} from '../positions/positions.schemas';

export const createTeamSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  state: yup.string().required(),
  city: yup.string().required(),
  maxWeight: yup.string(),
  maxAge: yup.string(),
  fieldsId: yup.array(),
  positions: createPositionsSchema.required(),
});

export const updateTeamSchema = yup.object().shape({
  name: yup.string(),
  description: yup.string(),
  state: yup.string(),
  city: yup.string(),
  maxWeight: yup.string(),
  maxAge: yup.string(),
  fieldsId: yup.array(),
  positions: updatePositionsSchema.notRequired(),
});
