import api from 'services/api/api';

import { ISignInForm } from './_models';

const SIGNIN_URL = '/auth/login';
const VERIFY_TOKEN_URL = "/users/current-user"

export async function login(body: ISignInForm) {
  return api.post(SIGNIN_URL, body);
}

export function getUserByToken(token: string) {
  return api.get(VERIFY_TOKEN_URL, {
    headers: { Authorization: `Bearer ${token}` },
  }
  );
}
