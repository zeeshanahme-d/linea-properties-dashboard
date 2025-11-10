import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { IUserModel } from '../auth/core/_models';
import * as authHelper from '../auth/core/auth-helpers';

interface AuthState {
  currentUser: IUserModel | undefined;
  setCurrentUser: (user: IUserModel | undefined) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: undefined,
      setCurrentUser: (user: IUserModel | undefined) => {
        set({ currentUser: user });
        if (user) {
          authHelper.setUser(user);
        } else {
          authHelper.removeAuth();
        }
      },
      logout: () => {
        authHelper.removeAuth();
        set({ currentUser: undefined });
        window.localStorage.removeItem(authHelper.USER_LOCAL_STORAGE_KEY);
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        currentUser: state.currentUser,
      }),
      onRehydrateStorage: () => (state) => {
        const userFromStorage = authHelper.getUser();
        if (userFromStorage) {
          console.log('userFromStorage', userFromStorage);
          state?.setCurrentUser(userFromStorage);
        } else {
          console.log('no user from storage');
          state?.setCurrentUser(undefined);
        }
      },
    }
  )
);

export const useAuth = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  const logout = useAuthStore((state) => state.logout);

  return {
    currentUser,
    setCurrentUser,
    logout,
  };
};

