import { Router } from 'express';

import createUserController from '../../controllers/users/createUser.controller';
/* import updateUserController from '../../controllers/users/updateUser.controller';
import deleteUserController from '../../controllers/users/deleteUser.controller';
import softDeleteUserController from '../../controllers/users/softDeleteUser.controller'; */
/* import listUsersController from '../../controllers/users/listUsers.controller'; */

/* import verifyAuthTokenMiddleware from '../../middlewares/verifyAuthToken.middlewares'; */
/* import verifyUpdateData from '../../middlewares/verifyUpdateData'; */

const router = Router();

router.post('/create', createUserController);

/* router.patch(
  '/update/:id',
  verifyUpdateData,
  verifyAuthTokenMiddleware,
  updateUserController
);

router.delete('/delete/:id', verifyAuthTokenMiddleware, deleteUserController);

router.delete(
  '/desactive/:id',
  verifyUpdateData,
  verifyAuthTokenMiddleware,
  softDeleteUserController
); */

/* router.get('', verifyAuthTokenMiddleware, listUsersController); */

export default router;
