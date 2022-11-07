import { IUserRequest } from '../../../interface/users/users';
import { IRequest } from '../../../interface/requests/requests';
import { ILogin } from '../../../interface/login';
/*
export const mockedUser: IUserRequest = {
  name: 'Laís',
  email: 'lais@mail.com',
  isAdm: false,
  password: '123456',
};

export const mockedAdmin: IUserRequest = {
  name: 'Lucas',
  email: 'lucas@mail.com',
  isAdm: true,
  password: '123456',
};
*/
export const mockedUserLogin: ILogin = {
  email: 'lais@mail.com',
  password: '123456',
};

export const mockedAdminLogin: ILogin = {
  email: 'lucas@mail.com',
  password: '123456',
};
/*
export const mockedTeam: ITeam = {
  name: 'Canela de Vidro',
};
*/
export const mockedRequest: IRequest = {
  position: 3,
  status: 1,
  userId: '',
  teamId: '',
};

export const mockedPropertyInvalidUserId: IRequest = {
  position: 3,
  status: 1,
  userId: '8f9ae6ce-e36c-4d9d-9bd7-b4c98cb4e4f4',
  teamId: '',
};

export const mockedRequestInvalidStatus: IRequest = {
  position: 3,
  status: 5,
  userId: '',
  teamId: '',
};

export const mockedRequestInvalidTeamId: IRequest = {
  position: 3,
  status: 1,
  userId: '',
  teamId: '8f9ae6ce-e36c-4d9d-9bd7-b4c98cb4e4f4',
};

export const mockedRequestInvalidPosition: IRequest = {
  position: 6,
  status: 1,
  userId: '',
  teamId: '',
};