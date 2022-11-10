import { Request, Response } from 'express';
import deleteRequestsService from '../../services/requests/deleteRequests.services';

const deleteRequestsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: string = req.params.id;
  const deletedRequest = await deleteRequestsService(id);
  return res.status(204).json(deletedRequest);
};
export default deleteRequestsController;