import { IAddresses } from '../addresses/addresses';
import { ISocialNetworks, ISocialNetworksUpdate } from '../netWorks/networks';
import { IPositions, IPositionsRequest } from '../positions/positions';

export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  age: number;
  height: number;
  weight: number;
  telephone: string;
  urlImg: string;
  address: IAddresses;
  positions: IPositionsRequest;
  isExercising: boolean;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  age: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  height: number;
  weight: number;
  telephone: string;
  urlImg: string;
  socialNetworks?: ISocialNetworks;
  address?: IAddresses;
  positions: IPositions;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
  age?: number;
  height?: number;
  weight?: number;
  telephone?: string;
  urlImg?: string;
  isExercising: boolean;
  socialNetwork?: ISocialNetworks;
  address?: IAddresses;
  positions?: IPositions;
}
