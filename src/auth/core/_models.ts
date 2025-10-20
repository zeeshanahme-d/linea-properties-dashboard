export interface IAuthModel {
  data: any;
  api_token: any;
}

export interface IUserModel {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface ISignInForm {
  email: string;
  password: string;
}
