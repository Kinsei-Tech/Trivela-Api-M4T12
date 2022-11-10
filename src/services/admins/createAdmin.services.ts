import { hash } from 'bcryptjs';
import AppDataSource from '../../data-source';
import { Admin } from '../../entities/admin.entity';
import { AppError } from '../../errors/appError';
import { IAdminData } from '../../interface/admins';

const createAdminServices = async ({ email, name, password }: IAdminData) => {
  const adminRepository = AppDataSource.getRepository(Admin);
  let admin = await adminRepository.findOneBy({
    email,
  });

  if (admin) {
    throw new AppError(400, 'Email already exists');
  }
  const adminCreated: Admin = adminRepository.create({
    email,
    name,
    password: await hash(password, 10),
  });
  await adminRepository.save(adminCreated);
  admin = await adminRepository.findOneBy({
    email,
  });
  return admin!;
};

export default createAdminServices;
