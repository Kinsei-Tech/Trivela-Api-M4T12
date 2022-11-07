import { IOwner, IOwnerLogin, IOwnerRequest } from '../../../interface/owners';

export const mockedOwnerRequest: IOwnerRequest = {
  name: 'SrTrivela',
  email: 'srtrivela@email.com',
  password: '123456',
};

export const mockedOwnerLogin: IOwnerLogin = {
  email: 'srtrivela@email.com',
  password: '123456',
};

export const mockedOwnerLoginIncorrectEmail: IOwnerLogin = {
  email: 'srtrivela@email.co',
  password: '123456',
};

export const mockedOwnerLoginIncorrectPasswoord: IOwnerLogin = {
  email: 'srtrivela@email.com',
  password: '12345678',
};
