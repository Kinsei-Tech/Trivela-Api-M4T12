export interface IOwner {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface IOwnerRequest {
  name: string;
  email: string;
  password: string;
}

export interface IOwnerLogin {
  email: string;
  password: string;
}

export interface IOwnerUpdate {
  name: string;
  password: string;
}
