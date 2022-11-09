import { Request, response, Response } from 'express';
import { Admin } from '../../entities/admin.entity';
import createAdminServices from '../../services/admins/createAdmin.services';
const createAdminController = async (req: Request, res: Response) => {
  const adminData = req.body;
  const adminCreated: Admin = await createAdminServices(adminData);
  return res.status(201).json(adminCreated);
};

export default createAdminController;
