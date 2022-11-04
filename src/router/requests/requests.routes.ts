import { Router } from 'express';
import {
  requestsCreateController,
  requestsListController,
} from '../../controllers/requests/requests.controller';
/* import { authUser } from '../middlewares/authUser.middleware';
import isAdminMiddleware from '../middlewares/isAdmin.middleware'; */

const requestsRoutes = Router();

requestsRoutes.post(
  '',
  /*  authUser, isAdminMiddleware, */ requestsCreateController
);
requestsRoutes.get('/:id', requestsListController);

export default requestsRoutes;
