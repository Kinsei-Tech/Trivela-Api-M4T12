import { Router } from 'express';
import deleteRequestsController from '../../controllers/requests/deleteRequests.controller';
import requestsCreateController from '../../controllers/requests/requests.controller';
import requestsListController from '../../controllers/requests/requestsList.controller';
import updateRequestsController from '../../controllers/requests/updateRequests.controller';

/*import { authUser } from '../middlewares/authUser.middleware';*/

const requestsRoutes = Router();
requestsRoutes.post(
  '',
  /*authUser*/ requestsCreateController
);
requestsRoutes.get('/:id', requestsListController);
requestsRoutes.delete('/delete/:id', deleteRequestsController);
requestsRoutes.patch('/response/:id', updateRequestsController);


export default requestsRoutes;
