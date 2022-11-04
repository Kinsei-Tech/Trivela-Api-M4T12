import { Request, Response } from 'express';
import requestsCreateService from '../../services/requests/requestsCreate.service';
import requestsListService from '../../services/requests/requestsList.service';

const requestsListController = async (req: Request, res: Response) => {
  const id: string = req.body.id;
  const requests = await requestsListService(id);
  return res.json(requests);
};

const requestsCreateController = async (req: Request, res: Response) => {
  const data = req.body;
  const createdRequestsInfo = await requestsCreateService(data);
  return res.status(201).json(createdRequestsInfo);
};

export { requestsListController, requestsCreateController };
