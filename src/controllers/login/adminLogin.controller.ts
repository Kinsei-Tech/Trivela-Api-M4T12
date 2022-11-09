import { Request, Response } from 'express';
import { ILogin } from '../../interface/login';
import adminLoginService from '../../services/login/adminLogin.service';

const adminLoginController = async (req: Request, res: Response) => {
  const data: ILogin = req.body;
  const token = await adminLoginService(data);
  return res.status(200).json({ token });
};

export default adminLoginController;
