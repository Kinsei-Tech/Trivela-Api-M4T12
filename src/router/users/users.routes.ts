import { Router } from 'express';

import createUserController from '../../controllers/users/createUser.controller';
import softDeleteUserController from '../../controllers/users/softDeleteUser.controller';
import deleteUserController from '../../controllers/users/deleteUser.controller';
import updateUserController from '../../controllers/users/updateUser.controller';

import listUsersController from '../../controllers/users/listUsers.controller';
import listUserController from '../../controllers/users/listUser.controller';
import ensureAuthMiddleware from '../../middlewares/ensureAuth.middleware';
import verifyIdAuthMiddleware from '../../middlewares/verifyIdAuth.middleware';
import validateSchemaMiddleware from '../../middlewares/validateSchema.middleware';
import {
  createUserSchema,
  updateUserSchema,
} from '../../schemas/users/users.schemas';

const router = Router();

router.post(
  '/create',
  validateSchemaMiddleware(createUserSchema),
  createUserController
);
router.get('', ensureAuthMiddleware, listUsersController);
router.get('/:id', ensureAuthMiddleware, listUserController);
router.patch(
  '/update/:id',
  ensureAuthMiddleware,
  verifyIdAuthMiddleware,
  validateSchemaMiddleware(updateUserSchema),
  updateUserController
);
router.delete(
  '/deactivate/:id',
  ensureAuthMiddleware,
  verifyIdAuthMiddleware,
  softDeleteUserController
);

router.delete(
  '/delete/:id',
  ensureAuthMiddleware,
  verifyIdAuthMiddleware,
  deleteUserController
);

export default router;
