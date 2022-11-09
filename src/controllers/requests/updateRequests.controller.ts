import { Request, Response } from 'express';
import { instanceToPlain } from 'class-transformer';
import { Request as RequestEntity } from '../../entities/requests.entity';
import { IRequest } from '../../interface/requests/requests';
import updatedRequestService from '../../services/requests/updateRequests.services';

const updateRequestsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: string = req.params.id;
  const update: IRequest = req.body;
  const updatedRequest: RequestEntity | null = await updatedRequestService(
    id,
    update
  );

  return res.json(instanceToPlain(updatedRequest));
};

export default updateRequestsController;
