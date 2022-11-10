import { Router } from 'express';
import createParticipantController from '../../controllers/participants/createParticipant.controller';
import deactivateParticipantController from '../../controllers/participants/deactivateParticipant.controller';
import deleteParticipantController from '../../controllers/participants/deleteParticipant.controller';
import listParticipantsPerTeamController from '../../controllers/participants/listParticipantsPerTeam.controller';
import updateParticipantController from '../../controllers/participants/updateParticipant.controller';
import ensureAuthMiddleware from '../../middlewares/ensureAuth.middleware';
import isTeamOwnerMiddleware from '../../middlewares/isTeamOwner.middleware';
import validateSchemaMiddleware from '../../middlewares/validateSchema.middleware';
import verifyParticipantMiddleware from '../../middlewares/verifyParticipant.middleware';
import {
  createParticipantSchema,
  updateParticipantSchema,
} from '../../schemas/participants/participants.schemas';

const router = Router();

router.post(
  '/create',
  ensureAuthMiddleware,
  validateSchemaMiddleware(createParticipantSchema),
  createParticipantController
);
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
  validateSchemaMiddleware(updateParticipantSchema),
  verifyParticipantMiddleware,
  updateParticipantController
);

export default router;
