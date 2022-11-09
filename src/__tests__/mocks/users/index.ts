import { IAddressesRequest } from '../../../interface/addresses/addresses';
import { ISocialNetworksUpdate } from '../../../interface/netWorks/networks';
import { IPositionsRequestTest } from '../../../interface/positions/positions';
import { IUserRequest } from '../../../interface/users/users';

export const mokedUser2: IUserRequest = {
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
    target: true,
    goalkeeper: false,
    leftwing: false,
    rightwing: false,
    fixed: true,
  },
  isExercising: true,
};

export const mokedUserNewSocialNetwork: ISocialNetworksUpdate = {
  socialNetwork: { facebook: 'https://facebook/trivelinha' },
};

export const mokedUserUpdateSocialNetwork: ISocialNetworksUpdate = {
  socialNetwork: { whatsApp: '99999999999' },
};
export const mokedUserUpdatePositions: IPositionsRequestTest = {
  positions: {
    target: true,
    goalkeeper: true,
    leftwing: false,
    rightwing: false,
    fixed: false,
  },
};

export const mokedUserupdateAdress: IAddressesRequest = {
  address: {
    street: 'esquina com meia',
    district: 'Hueco',
    zipCode: '10948340',
    number: '66',
    complement: 'vazio',
    city: 'Hueco',
    state: 'Mundo',
  },
};
