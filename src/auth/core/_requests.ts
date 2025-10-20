import api from 'services/api/api';
import authApi from 'services/api/authApi';

import { ISignInForm } from './_models';

const SIGNIN_URL = '/auth/login';
const VERIFY_TOKEN_URL = '/auth/verify-token';

export async function login(body: ISignInForm) {
  return api.post(SIGNIN_URL, body);
}

export function getUserByToken(token: string) {
  return authApi.get(VERIFY_TOKEN_URL, {
    headers: { Authorization: `Bearer ${token}` },
  }
  );
}
