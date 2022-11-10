export interface IAddresses {
  street: string;
  district: string;
  zipCode: string;
  number: string;
  complement: string;
  city: string;
  state: string;
}

export interface IAddressesRequest {
  address: IAddresses;
}
