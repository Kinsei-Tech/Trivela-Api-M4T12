import { Router } from 'express';
import deleteOwnerController from '../../controllers/owners/deleteOwners.controller';
import listOwnersController from '../../controllers/owners/listOwners.controller';
import softDeleteOwnerController from '../../controllers/owners/softDeleteOwners.controller';

import ensureAuthMiddleware from '../../middlewares/ensureAuth.middleware';
import verifyIdAuthMiddleware from '../../middlewares/verifyIdAuth.middleware';

const adminOwnerRouter = Router();

adminOwnerRouter.get('', ensureAuthMiddleware, /*verifyIdAdminMiddleware,*/ listOwnersController);
adminOwnerRouter.delete(
  '/deactivate/:id',
  ensureAuthMiddleware,
  verifyIdAuthMiddleware,
  //verifyIdAdminMiddleware,
  softDeleteOwnerController
);
adminOwnerRouter.delete(
  '/delete/:id',
  ensureAuthMiddleware,
  verifyIdAuthMiddleware,
  //verifyIdAdminMiddleware,
  deleteOwnerController
);

export default adminOwnerRouter;
