import { Router } from 'express';
import createParticipantController from '../../controllers/participants/createParticipant.controller';
import deactivateParticipantController from '../../controllers/participants/deactivateParticipant.controller';
import deleteParticipantController from '../../controllers/participants/deleteParticipant.controller';
import listParticipantsPerTeamController from '../../controllers/participants/listParticipantsPerTeam.controller';
import updateParticipantController from '../../controllers/participants/updateParticipant.controller';
import ensureAuthMiddleware from '../../middlewares/ensureAuth.middleware';
import isTeamOwnerMiddleware from '../../middlewares/isTeamOwner.middleware';
import verifyParticipantMiddleware from '../../middlewares/verifyParticipant.middleware';

const router = Router();

router.post('/create', ensureAuthMiddleware, createParticipantController);
router.delete(
  '/deactivate/:id/:userId', //id = id do time!
  ensureAuthMiddleware,
  isTeamOwnerMiddleware,
  verifyParticipantMiddleware,
  deactivateParticipantController
);
router.delete(
  '/delete/:id/:userId', //id = id do time!
  ensureAuthMiddleware,
  isTeamOwnerMiddleware,
  verifyParticipantMiddleware,
  deleteParticipantController
);
router.get(
  '/team/:id', //id = id do time!
  ensureAuthMiddleware,
  isTeamOwnerMiddleware,
  listParticipantsPerTeamController
);
router.patch(
  '/update/:id/:userId', //id = id do time!
  ensureAuthMiddleware,
  isTeamOwnerMiddleware,
  verifyParticipantMiddleware,
  updateParticipantController
);

export default router;
