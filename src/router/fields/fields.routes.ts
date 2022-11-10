import { Router } from 'express';
import createFieldController from '../../controllers/fields/createField.controller';
import deleteFieldController from '../../controllers/fields/deleteField.controller';
import listFieldsController from '../../controllers/fields/listFields.controller';
import softDeleteFieldController from '../../controllers/fields/softDeleteField.controller';
import updateFieldController from '../../controllers/fields/updateField.controller';
import ensureAuthMiddleware from '../../middlewares/ensureAuth.middleware';
import isOwnerField from '../../middlewares/isOwnerField.middleware';
import validateSchemaMiddleware from '../../middlewares/validateSchema.middleware';
import verifyIdFieldMiddleware from '../../middlewares/verifyIdField.middleware';
import {
  createFieldSchema,
  updateFieldSchema,
} from '../../schemas/fields/fields.schemas';

const router = Router();

router.post(
  '',
  ensureAuthMiddleware,
  validateSchemaMiddleware(createFieldSchema),
  createFieldController
);
router.get('/owners', ensureAuthMiddleware, listFieldsController);
router.patch(
  '/owners/:id',
  ensureAuthMiddleware,
  isOwnerField,
  verifyIdFieldMiddleware,
  validateSchemaMiddleware(updateFieldSchema),
  updateFieldController
);
router.delete(
  '/delete/:id',
  ensureAuthMiddleware,
  isOwnerField,
  verifyIdFieldMiddleware,
  deleteFieldController
);
router.delete(
  '/deactivate/:id',
  ensureAuthMiddleware,
  isOwnerField,
  verifyIdFieldMiddleware,
  softDeleteFieldController
);

export default router;
