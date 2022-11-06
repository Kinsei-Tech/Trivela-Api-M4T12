import { Router } from 'express';

import createUserController from '../../controllers/users/createUser.controller';
import softDeleteUserController from '../../controllers/users/softDeleteUser.controller';
import deleteUserController from '../../controllers/users/deleteUser.controller';
import updateUserController from '../../controllers/users/updateUser.controller';

import listUsersController from '../../controllers/users/listUsers.controller';
import listUserController from '../../controllers/users/listUser.controller';
import ensureAuthMiddleware from '../../middlewares/ensureAuth.middleware';
import verifyIdAuthMiddleware from '../../middlewares/verifyIdAuth.middleware';

const router = Router();

router.post('/create', createUserController);

router.delete(
  '/desactive/:id',
  ensureAuthMiddleware,
  verifyIdAuthMiddleware,
  softDeleteUserController
);
router.get('', ensureAuthMiddleware, listUsersController);

router.delete(
  '/delete/:id',
  ensureAuthMiddleware,
  verifyIdAuthMiddleware,
  deleteUserController
);

router.get('/:id', ensureAuthMiddleware, listUserController);

router.patch(
  '/update/:id',
  ensureAuthMiddleware,
  verifyIdAuthMiddleware,
  updateUserController
);

export default router;
