import * as yup from 'yup';

export const createAddressSchema = yup.object().shape({
  street: yup.string().required('street is required'),
  district: yup.string().required('district is required'),
  zipCode: yup.string().required('zipCode is required'),
  number: yup.string(),
  complement: yup.string(),
  city: yup.string().required('city is required'),
  state: yup.string().required('state is required').length(2),
});

export const updateAddressSchema = yup.object({
  street: yup.string().notRequired(),
  district: yup.string().notRequired(),
  zipCode: yup.string().notRequired(),
  number: yup.string().notRequired(),
  complement: yup.string().notRequired(),
  city: yup.string().notRequired(),
  state: yup
    .string()
    .length(
      2,
      'Please, write only the acronym of the state. ex: São Paulo -> SP'
    )
    .notRequired(),
});
