import { Router } from 'express';
import deleteRequestsController from '../../controllers/requests/deleteRequests.controller';
import requestsCreateController from '../../controllers/requests/requests.controller';
import requestsListController from '../../controllers/requests/requestsList.controller';
import updateRequestsController from '../../controllers/requests/updateRequests.controller';
import ensureAuthMiddleware from '../../middlewares/ensureAuth.middleware';
import validateSchemaMiddleware from '../../middlewares/validateSchema.middleware';
import {
  createRequestSchema,
  updateRequestSchema,
} from '../../schemas/requests/requests.schemas';

const requestsRoutes = Router();
requestsRoutes.post(
  '',
  ensureAuthMiddleware,
  validateSchemaMiddleware(createRequestSchema),
  requestsCreateController
);
requestsRoutes.get('/:id', ensureAuthMiddleware, requestsListController);
requestsRoutes.delete(
  '/delete/:id',
  ensureAuthMiddleware,
  deleteRequestsController
);
requestsRoutes.patch(
  '/response/:id',
  ensureAuthMiddleware,
  validateSchemaMiddleware(updateRequestSchema),
  updateRequestsController
);

export default requestsRoutes;
