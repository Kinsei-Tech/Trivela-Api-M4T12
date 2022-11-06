import { Request, Response, NextFunction } from 'express';

const verifyIdAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const loggedUser = req.user.id;

  if (loggedUser !== id) {
    return res.status(404).json({
      message: 'No permission to change this user',
    });
  }

  return next();
};

export default verifyIdAuthMiddleware;
