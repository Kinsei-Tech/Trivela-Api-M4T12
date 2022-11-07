import { Router } from 'express';

import createUserController from '../../controllers/users/createUser.controller';
import softDeleteUserController from '../../controllers/users/softDeleteUser.controller';
import deleteUserController from '../../controllers/users/deleteUser.controller';
import updateUserController from '../../controllers/users/updateUser.controller';

import listUsersController from '../../controllers/users/listUsers.controller';
import listUserController from '../../controllers/users/listUser.controller';

/* import verifyAuthTokenMiddleware from '../../middlewares/verifyAuthToken.middlewares'; */
/* import verifyUpdateData from '../../middlewares/verifyUpdateData'; */

const router = Router();

router.post('/create', createUserController);
router.delete('/deactivate/:id', softDeleteUserController);
router.delete('/delete/:id', deleteUserController);
router.get('', /* verifyAuthTokenMiddleware,  */ listUsersController);
router.get('/:id', /* verifyAuthTokenMiddleware,  */ listUserController);

router.patch(
  '/update/:id',
  /*   verifyUpdateData,
  verifyAuthTokenMiddleware, */
  updateUserController
);

export default router;
