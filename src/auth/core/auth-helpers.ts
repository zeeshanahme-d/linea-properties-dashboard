import axios from 'axios';

import { IUserModel } from './_models';

const USER_LOCAL_STORAGE_KEY = import.meta.env.VITE_USER_LOCAL_STORAGE_KEY as string;

const getUser = (): IUserModel | undefined => {
  const lsValue: string | null = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
  if (!lsValue) return;
  return JSON.parse(lsValue) as IUserModel;
};

const getToken = (): string | undefined => {
  const user = getUser();
  return user?.token;
};

const setUser = (user: IUserModel) => {
  const lsValue = JSON.stringify(user);
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, lsValue);
};

const removeAuth = () => {
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
};

export function setupAxios() {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

  // Add a request interceptor to attach token to headers
  axios.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const isUnAuthorized = Boolean(error?.response?.status === 403) || Boolean(error?.response?.status === 401);
      if (isUnAuthorized) removeAuth();

      return Promise.reject(error);
    }
  );
}

export { setUser, getUser, getToken, removeAuth, USER_LOCAL_STORAGE_KEY };
