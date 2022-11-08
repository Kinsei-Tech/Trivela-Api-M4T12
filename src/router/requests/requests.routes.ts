/*import { Router } from 'express';
import deleteRequestsController from '../../controllers/requests/deleteRequests.controller';
import requestsCreateController from '../../controllers/requests/requests.controller';
import requestsListController from '../../controllers/requests/requestsList.controller';

import { authUser } from '../middlewares/authUser.middleware';
import isAdminMiddleware from '../middlewares/isAdmin.middleware'; 

const router = Router();
router.post(
  '',
   authUser, isAdminMiddleware,  requestsCreateController
);
router.get('/:id', requestsListController);
router.delete('/delete/:id', deleteRequestsController);

export default router; */
