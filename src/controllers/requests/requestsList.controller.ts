import { Request, Response } from 'express';
import requestsListService from '../../services/requests/requestsList.services';

const requestsListController = async (req: Request, res: Response) => {
    const id: string = req.body.id;
    const requests = await requestsListService(id);
    return res.json(requests);
  };

export default requestsListController