import { IUserRequest } from '../../../interface/users/users';
import { IRequest } from '../../../interface/requests/requests';
import { ILogin } from '../../../interface/login';

export const mokedUser2 = {
  name: 'Trivelinha',
  email: 'trivelinha2@email.com',
  password: '123456',
  age: 16,
  height: 1.8,
  weight: 20,
  telephone: '999999999',
  urlImg:
    'https://i.pinimg.com/736x/1e/60/11/1e6011d677d527b624c60d9cd0240c98.jpg',
  address: {
    street: 'Rua Pe. Frederico',
    district: 'Santa Catarina',
    zipCode: '36035-150',
    number: '48',
    complement: 'apart. 503',
    city: 'Juiz de Fora',
    state: 'MG',
  },
  position: {
    id: '02',
    target: true,
    goalkeeper: false,
    leftwing: false,
    rightwing: false,
    fixed: true,
  },
  isExercising: true,
};

export const mockedUserLogin: ILogin = {
  email: 'trivelinha2@email.com',
  password: '123456',
};

export const mockedTeam0 = {
  name: 'Meia Boca',
  description:
    'Busco pessoas para completar meu time de futsal aos sábados depois das 17h ',
  state: 'MG',
  city: 'Juiz de Fora',
  maxWeight: 100,
  maxAge: 40,
  positions: {
    target: true,
    goalkeeper: false,
    leftwing: true,
    rightwing: false,
    fixed: true,
  },
};

export const mockedTeam = {
  name: 'Clube das aposentadas',
  description:
    'Para aposentadas que gostam de futsal. Jogos aos domingos, 7h da manhã',
  state: 'MG',
  city: 'Juiz de Fora',
  maxWeight: 80,
  maxAge: 100,
  positions: {
    target: false,
    goalkeeper: true,
    leftwing: true,
    rightwing: true,
    fixed: false,
  },
};

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