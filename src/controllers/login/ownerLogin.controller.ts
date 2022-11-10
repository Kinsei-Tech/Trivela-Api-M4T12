import { Request, Response } from 'express';
import { ILogin } from '../../interface/login';
import ownerLoginService from '../../services/login/ownerLogin.service';

const ownerLoginController = async (req: Request, res: Response) => {
  const data: ILogin = req.validatedBody;
  const token = await ownerLoginService(data);
  return res.status(200).json({ token });
};

export default ownerLoginController;
