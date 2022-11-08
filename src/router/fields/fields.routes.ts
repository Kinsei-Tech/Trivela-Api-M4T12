import { Router } from 'express';
import createFieldController from '../../controllers/fields/createField.controller';
import deleteFieldController from '../../controllers/fields/deleteField.controller';
import listFieldsController from '../../controllers/fields/listFields.controller';
import softDeleteFieldController from '../../controllers/fields/softDeleteField.controller';
import updateFieldController from '../../controllers/fields/updateField.controller';
import ensureAuthMiddleware from '../../middlewares/ensureAuth.middleware';
import isOwnerField from '../../middlewares/isOwnerField.middleware';

const router = Router();

router.post('', ensureAuthMiddleware, createFieldController);
router.get('/owners', ensureAuthMiddleware, listFieldsController);
router.patch(
  '/owners/:id',
  ensureAuthMiddleware,
  isOwnerField,
  updateFieldController
);
router.delete(
  '/:id',
  ensureAuthMiddleware,
  isOwnerField,
  deleteFieldController
);
router.delete(
  '/:id',
  ensureAuthMiddleware,
  isOwnerField,
  softDeleteFieldController
);

export default router;
