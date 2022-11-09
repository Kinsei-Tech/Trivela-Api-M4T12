import { Router } from 'express';
import deleteOwnerController from '../../controllers/owners/deleteOwners.controller';
import listOwnersController from '../../controllers/owners/listOwners.controller';
import softDeleteOwnerController from '../../controllers/owners/softDeleteOwners.controller';

import ensureAuthMiddleware from '../../middlewares/ensureAuth.middleware';
import isAdminOwnerMiddleware from '../../middlewares/isAdmin.middleware';

const adminsOwnerRouter = Router();

adminsOwnerRouter.get('', ensureAuthMiddleware, isAdminOwnerMiddleware, listOwnersController);
adminsOwnerRouter.delete(
  '/deactivate/:id',
  ensureAuthMiddleware,
  isAdminOwnerMiddleware,
  softDeleteOwnerController
);
adminsOwnerRouter.delete(
  '/delete/:id',
  ensureAuthMiddleware,
  isAdminOwnerMiddleware,
  deleteOwnerController
);

export default adminsOwnerRouter;