import { Router } from 'express';
import deleteRequestsController from '../../controllers/requests/deleteRequests.controller';
import requestsCreateController from '../../controllers/requests/requests.controller';
import requestsListController from '../../controllers/requests/requestsList.controller';
import updateRequestsController from '../../controllers/requests/updateRequests.controller';
import ensureAuthMiddleware from '../../middlewares/ensureAuth.middleware';

const requestsRoutes = Router();
requestsRoutes.post('', ensureAuthMiddleware, requestsCreateController);
requestsRoutes.get('/:id', ensureAuthMiddleware, requestsListController);
requestsRoutes.delete('/delete/:id', ensureAuthMiddleware, deleteRequestsController);
requestsRoutes.patch('/response/:id', ensureAuthMiddleware, updateRequestsController);

export default requestsRoutes;
