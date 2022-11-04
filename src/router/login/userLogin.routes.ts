import { Router } from 'express';
import userLoginController from '../../controllers/login/userLogin.controller';

const userLoginRouter = Router();

userLoginRouter.post('', userLoginController);

export default userLoginRouter;