import { date } from 'yup';

export interface IOwnerRequest {
  name: string;
  email: string;
  password: string;
}

export interface IOwner extends IOwnerRequest {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
