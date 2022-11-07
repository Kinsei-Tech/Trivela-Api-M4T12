import { Router } from 'express';
import createTeamController from '../../controllers/teams/createTeam.controller';
import deactivateTeamController from '../../controllers/teams/deactivateTeam.controller';
import deleteTeamController from '../../controllers/teams/deleteTeam.controller';
import listTeamsController from '../../controllers/teams/listTeams.controller';
import updateTeamController from '../../controllers/teams/updateTeam.controller';

const router = Router();

router.post('/create', createTeamController);
router.delete('/deactivate/:id', deactivateTeamController);
router.delete('/delete/:id', deleteTeamController);
router.get('', /* verifyAuthTokenMiddleware, */ listTeamsController);
router.get('/:id', /* verifyAuthTokenMiddleware */ listTeamsController);
router.patch(
  '/update/:id' /* verifyUpdateData, verifyAuthTokenMiddleware */,
  updateTeamController
);

export default router;
