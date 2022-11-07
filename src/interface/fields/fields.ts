import { IAdresses } from '../adresses/adresses';
import { IOwner } from '../owners/owners';

export interface IFieldRequest {
  name: string;
  ownerId: string;
  address: IAdresses;
}

export interface IField extends Omit<IFieldRequest, 'ownerId'> {
  id: string;
  isActive: boolean;
  owner: IOwner;
  createdAt: Date;
  updatedAt: Date;
}
