import { Request, Response } from 'express';
import requestsListByUserService from '../../services/requests/requestsListByUser.services';

const requestsListByUserController = async (req: Request, res: Response) => {
    const userId: string = req.body.userId;
    const requests = await requestsListByUserService(userId);
    return res.json(requests);
}

export default requestsListByUserController;