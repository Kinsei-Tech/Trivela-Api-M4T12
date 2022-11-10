import { Router } from 'express';
import createOwnerController from '../../controllers/owners/createOwners.controller';
import deleteOwnerController from '../../controllers/owners/deleteOwners.controller';
import listOwnersController from '../../controllers/owners/listOwners.controller';
import softDeleteOwnerController from '../../controllers/owners/softDeleteOwners.controller';
import updateOwnerController from '../../controllers/owners/updateOwners.controller';

import ensureAuthMiddleware from '../../middlewares/ensureAuth.middleware';
import validateSchemaMiddleware from '../../middlewares/validateSchema.middleware';
import verifyIdAuthMiddleware from '../../middlewares/verifyIdAuth.middleware';
import {
  createOwnerSchema,
  updateOwnerSchema,
} from '../../schemas/owners/owners.schemas';

const ownerRouter = Router();

ownerRouter.post(
  '',
  validateSchemaMiddleware(createOwnerSchema),
  createOwnerController
);
ownerRouter.get('', ensureAuthMiddleware, listOwnersController);
ownerRouter.patch(
  '/:id',
  ensureAuthMiddleware,
  verifyIdAuthMiddleware,
  /* validateSchemaMiddleware(updateOwnerSchema), */
  updateOwnerController
);
ownerRouter.delete(
  '/soft/:id',
  ensureAuthMiddleware,
  verifyIdAuthMiddleware,
  softDeleteOwnerController
);
ownerRouter.delete(
  '/:id',
  ensureAuthMiddleware,
  verifyIdAuthMiddleware,
  deleteOwnerController
);

export default ownerRouter;
