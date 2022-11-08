import { IAddresses } from '../addresses/addresses';
import { IOwner } from '../owners/owners';

export interface IFieldRequest {
  name: string;
  ownerId: string;
  address: IAddresses;
  isActive: boolean;
}

export interface IField extends Omit<IFieldRequest, 'ownerId'> {
  id: string;
  isActive: boolean;
  owner: IOwner;
  createdAt: Date;
  updatedAt: Date;
}
