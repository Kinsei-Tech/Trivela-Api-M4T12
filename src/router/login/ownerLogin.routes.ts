import { Router } from 'express';
import ownerLoginController from '../../controllers/login/ownerLogin.controller';
import validateSchemaMiddleware from '../../middlewares/validateSchema.middleware';
import { loginSchema } from '../../schemas/login/login.schemas';

const ownerLoginRouter = Router();

ownerLoginRouter.post(
  '',
  validateSchemaMiddleware(loginSchema),
  ownerLoginController
);

export default ownerLoginRouter;
