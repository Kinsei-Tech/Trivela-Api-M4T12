import * as yup from 'yup';
import {
  createAddressSchema,
  updateAddressSchema,
} from '../addresses/addresses.schema';

export const createFieldSchema = yup.object().shape({
  name: yup.string().required(),
  address: createAddressSchema.required(),
});

export const updateFieldSchema = yup.object().shape({
  name: yup.string(),
  address: updateAddressSchema.notRequired(),
});
