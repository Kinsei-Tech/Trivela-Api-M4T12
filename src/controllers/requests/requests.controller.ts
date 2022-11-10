import { Request, Response } from 'express';
import requestsCreateService from '../../services/requests/requestsCreate.services';

const requestsCreateController = async (req: Request, res: Response) => {
  const data = req.validatedBody;
  const createdRequestsInfo = await requestsCreateService(data);
  return res.status(201).json(createdRequestsInfo);
};

export default requestsCreateController;
