import { Request, Response } from "express";
import requestsCreateService from "../../services/requests/requestsCreate.service";
import requestsListService from "../../services/requests/requestsList.service";

const requestsListController = async (req: Request, res: Response) => {
    const data = req.body;
    const createdRequestsInfo = await requestsCreateService(data);
  
    return res.status(201).json(createdRequestsInfo);
}

const  requestsCreateController = async (req: Request, res: Response) => {
    const requests = await requestsListService();
  return res.json(requests);
}

export { requestsListController, requestsCreateController };