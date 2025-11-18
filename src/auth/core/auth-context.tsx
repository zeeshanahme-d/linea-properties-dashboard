import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { IUserModel } from './_models';
import { getUserByToken } from './_requests';
import * as authHelper from './auth-helpers';

type IProps = {
  children: ReactNode;
};

type AuthContextProps = {
  currentUser: IUserModel | null;
  setCurrentUser: Dispatch<SetStateAction<IUserModel | null>>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthInit provider');
  }
  return context;
}

function AuthInit({ children }: IProps) {
  const [currentUser, setCurrentUser] = useState<IUserModel | null>(authHelper.getUser() ?? null);
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const didRequest = useRef(false);

  // Verify token once on app load / page reload
  useEffect(() => {

    const initializeUser = async () => {
      if (didRequest.current) return;
      didRequest.current = true;

      const token = authHelper.getToken();
      if (!token) {
        authHelper.removeAuth();
        setCurrentUser(null);
        setShowSplashScreen(false);
        return;
      }

      try {
        const { data } = await getUserByToken(token);

        if (data) {
          const authData = {
            token: token,
            data: data,
          };
          setCurrentUser(authData);
          authHelper.setUser(authData);
        } else {
          setCurrentUser(null);
          authHelper.removeAuth();
        }
      } catch (error) {
        console.error(error);
        setCurrentUser(null);
        authHelper.removeAuth();
      } finally {
        setShowSplashScreen(false);
      }
    };

    initializeUser();
  }, []);

  const logout = () => {
    setCurrentUser(null);
    authHelper.removeAuth();
  };

  if (showSplashScreen) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthInit, useAuth };
