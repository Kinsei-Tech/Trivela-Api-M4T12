import { Router } from 'express';
import userLoginController from '../../controllers/login/userLogin.controller';
import validateSchemaMiddleware from '../../middlewares/validateSchema.middleware';
import { loginSchema } from '../../schemas/login/login.schemas';

const userLoginRouter = Router();

userLoginRouter.post(
  '',
  validateSchemaMiddleware(loginSchema),
  userLoginController
);

export default userLoginRouter;
