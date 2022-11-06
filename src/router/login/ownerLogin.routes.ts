import { Router } from 'express';
import ownerLoginController from '../../controllers/login/ownerLogin.controller';

const ownerLoginRouter = Router();

ownerLoginRouter.post('', ownerLoginController);

export default ownerLoginRouter;
