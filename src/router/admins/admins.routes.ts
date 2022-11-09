import { Router } from 'express';
import createAdminController from '../../controllers/admins/createAdmin.controller';
import deleteUserController from '../../controllers/users/deleteUser.controller';
import softDeleteUserController from '../../controllers/users/softDeleteUser.controller';
import ensureAuthMiddleware from '../../middlewares/ensureAuth.middleware';
import isAdminOwnerMiddleware from '../../middlewares/isAdmin.middleware';

const router = Router();

router.post('', createAdminController);
router.delete(
  '/users/deactivate/:id',
  ensureAuthMiddleware,
  isAdminOwnerMiddleware,
  softDeleteUserController
);
router.delete('/users/delete/:id', deleteUserController);

export default router;
