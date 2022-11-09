import { Router } from 'express';
import createTeamController from '../../controllers/teams/createTeam.controller';
import deactivateTeamController from '../../controllers/teams/deactivateTeam.controller';
import deleteTeamController from '../../controllers/teams/deleteTeam.controller';
import listTeamsController from '../../controllers/teams/listTeams.controller';
import listTeamController from '../../controllers/teams/listTeam.controller';
import updateTeamController from '../../controllers/teams/updateTeam.controller';
import ensureAuthMiddleware from '../../middlewares/ensureAuth.middleware';
import isTeamOwnerMiddleware from '../../middlewares/isTeamOwner.middleware';

const router = Router();

router.post('/create', ensureAuthMiddleware, createTeamController);
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
  '/update/:id' /* verifyUpdateData,*/,
  ensureAuthMiddleware,
  isTeamOwnerMiddleware,
  updateTeamController
);

export default router;
