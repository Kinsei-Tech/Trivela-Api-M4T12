import { Router } from 'express';
import admDeactivateTeamController from '../../controllers/admins/teams/admDeactivateTeam.controller';
import admDeleteTeamController from '../../controllers/admins/teams/admDeleteTeam.controller';
import deleteOwnerController from '../../controllers/owners/deleteOwners.controller';
import listOwnersController from '../../controllers/owners/listOwners.controller';
import softDeleteOwnerController from '../../controllers/owners/softDeleteOwners.controller';

import ensureAuthMiddleware from '../../middlewares/ensureAuth.middleware';
import isAdminOwnerMiddleware from '../../middlewares/isAdmin.middleware';

const adminsOwnerRouter = Router();

adminsOwnerRouter.get(
  '',
  ensureAuthMiddleware,
  isAdminOwnerMiddleware,
  listOwnersController
);
adminsOwnerRouter.delete(
  '/deactivate/:id',
  ensureAuthMiddleware,
  isAdminOwnerMiddleware,
  admDeactivateTeamController
);
adminsOwnerRouter.delete(
  '/delete/:id',
  ensureAuthMiddleware,
  isAdminOwnerMiddleware,
  admDeleteTeamController
);

export default adminsOwnerRouter;
