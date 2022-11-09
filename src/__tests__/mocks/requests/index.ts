
import { IRequest } from '../../../interface/requests/requests';

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