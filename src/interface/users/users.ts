import { IAdresses } from '../adresses/adresses';
import { ISocialNetworks, ISocialNetworksUpdate } from '../netWorks/networks';
import { IPositions } from '../positions/positions';

export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  age: number;
  height: number;
  weight: number;
  telephone: string;
  urlImg: string;
  adress: IAdresses;
  position: IPositions;
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
  adress?: IAdresses;
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
  socialNetwork?: ISocialNetworksUpdate;
  adress?: IAdresses;
  positions?: IPositions;
}
