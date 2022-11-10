import * as yup from 'yup';
import {
  createAddressSchema,
  updateAddressSchema,
} from '../addresses/addresses.schema';
import { networksSchema } from '../networks/networks.schemas';
import {
  createPositionsSchema,
  updatePositionsSchema,
} from '../positions/positions.schemas';

export const createUserSchema = yup.object().shape({
  name: yup.string().required('name is required'),
  email: yup.string().required('email is required'),
  password: yup.string().required('password is required'),
  age: yup.number(),
  height: yup.number(),
  weight: yup.number(),
  telephone: yup.string().required('telephone is required'),
  isExercising: yup.boolean().required('isExercising is required'),
  urlImg: yup.string(),
  socialNetwork: networksSchema,
  address: createAddressSchema.required('address is required'),
  positions: createPositionsSchema.required(),
});

export const updateUserSchema = yup.object().shape({
  name: yup.string(),
  email: yup.string(),
  password: yup.string(),
  age: yup.number(),
  height: yup.number(),
  weight: yup.number(),
  telephone: yup.string(),
  isExercising: yup.boolean(),
  urlImg: yup.string(),
  address: updateAddressSchema.notRequired(),
  positions: updatePositionsSchema.notRequired(),
  socialNetwork: networksSchema.notRequired(),
});
