import api from 'services/api/api';

import { ISignInForm } from './_models';

const SIGNIN_URL = '/auth/login';

export async function login(body: ISignInForm) {
  return api.post(SIGNIN_URL, body);
}
