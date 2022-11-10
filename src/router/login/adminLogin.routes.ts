import { Router } from 'express';
import adminLoginController from '../../controllers/login/adminLogin.controller';

const adminLoginRouter = Router();

adminLoginRouter.post('', adminLoginController);

export default adminLoginRouter;
