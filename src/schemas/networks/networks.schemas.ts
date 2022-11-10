import * as yup from 'yup';

export const networksSchema = yup.object({
  linkedin: yup.string(),
  whatsApp: yup.string(),
  facebook: yup.string(),
  tiktok: yup.string(),
  instagram: yup.string(),
});
