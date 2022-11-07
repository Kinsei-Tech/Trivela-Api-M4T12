import { Router } from 'express';
import createOwnerController from '../../controllers/owners/createOwners.controller';
import deleteOwnerController from '../../controllers/owners/deleteOwners.controller';
import listOwnersController from '../../controllers/owners/listOwners.controller';
import softDeleteOwnerController from '../../controllers/owners/softDeleteOwners.controller';
import updateOwnerController from '../../controllers/owners/updateOwners.controller';

import ensureAuthMiddleware from '../../middlewares/ensureAuth.middleware';
import verifyIdAuthMiddleware from '../../middlewares/verifyIdAuth.middleware';

const ownerRouter = Router();

ownerRouter.post('', createOwnerController);
ownerRouter.get('', ensureAuthMiddleware, listOwnersController);
ownerRouter.patch(
  '/:id',
  ensureAuthMiddleware,
  verifyIdAuthMiddleware,
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
