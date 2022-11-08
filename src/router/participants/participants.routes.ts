import { Router } from 'express';
import createParticipantController from '../../controllers/participants/createParticipant.controller';
import deactivateParticipantController from '../../controllers/participants/deactivateParticipant.controller';
import deleteParticipantController from '../../controllers/participants/deleteParticipant.controller';
import listParticipantsPerTeamController from '../../controllers/participants/listParticipantsPerTeam.controller';
import updateParticipantController from '../../controllers/participants/updateParticipant.controller';
import ensureAuthMiddleware from '../../middlewares/ensureAuth.middleware';

const router = Router();

router.post('/create', ensureAuthMiddleware, createParticipantController);
router.delete(
  '/deactivate/:id',
  ensureAuthMiddleware,
  deactivateParticipantController
);
router.delete('/delete/:id', ensureAuthMiddleware, deleteParticipantController);
router.get(
  '/team/:id',
  ensureAuthMiddleware,
  listParticipantsPerTeamController
);
router.patch('/update/:id', ensureAuthMiddleware, updateParticipantController);

export default router;
