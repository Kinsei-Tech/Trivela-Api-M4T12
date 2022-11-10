import { Request, Response } from 'express';
import { ILogin } from '../../interface/login';
import userLoginService from '../../services/login/userLogin.service';

const userLoginController = async (req: Request, res: Response) => {
  const data: ILogin = req.validatedBody;
  const token = await userLoginService(data);
  return res.status(200).json({ token });
};

export default userLoginController;
