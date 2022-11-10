import { Router } from 'express';
import createTeamController from '../../controllers/teams/createTeam.controller';
import deactivateTeamController from '../../controllers/teams/deactivateTeam.controller';
import deleteTeamController from '../../controllers/teams/deleteTeam.controller';
import listTeamsController from '../../controllers/teams/listTeams.controller';
import listTeamController from '../../controllers/teams/listTeam.controller';
import updateTeamController from '../../controllers/teams/updateTeam.controller';
import ensureAuthMiddleware from '../../middlewares/ensureAuth.middleware';
import isTeamOwnerMiddleware from '../../middlewares/isTeamOwner.middleware';
import validateSchemaMiddleware from '../../middlewares/validateSchema.middleware';
import {
  createTeamSchema,
  updateTeamSchema,
} from '../../schemas/teams/teams.schemas';

const router = Router();

router.post(
  '/create',
  ensureAuthMiddleware,
  validateSchemaMiddleware(createTeamSchema),
  createTeamController
);
router.delete(
  '/deactivate/:id',
  ensureAuthMiddleware,
  isTeamOwnerMiddleware,
  deactivateTeamController
);
router.delete(
  '/delete/:id',
  ensureAuthMiddleware,
  isTeamOwnerMiddleware,
  deleteTeamController
);
router.get('', ensureAuthMiddleware, listTeamsController);
router.get('/:id', ensureAuthMiddleware, listTeamController);
router.patch(
  '/update/:id',
  ensureAuthMiddleware,
  validateSchemaMiddleware(updateTeamSchema),
  isTeamOwnerMiddleware,
  updateTeamController
);

export default router;
