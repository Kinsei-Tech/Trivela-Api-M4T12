import { ILogin } from '../../../interface/login';
import { IUserRequest } from '../../../interface/users/users';

export const mokedUser = {
  name: 'Trivelinha',
  email: 'trivelinha@email.com',
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
  positions: {
    id: '02',
    target: true,
    goalkeeper: false,
    leftwing: false,
    rightwing: false,
    fixed: true,
  },
  isExercising: true,
};

export const mockedCorrectLogin: ILogin = {
  email: 'trivelinha@email.com',
  password: '123456',
};

export const mockedIncorrectEmailLogin: ILogin = {
  email: 'trivelin@email.com',
  password: '123456',
};

export const mockedIncorrectPasswordLogin: ILogin = {
  email: 'trivelinha@email.com',
  password: '123',
};
