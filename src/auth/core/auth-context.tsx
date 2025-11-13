import {
  ReactNode,
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';

import * as authHelper from './auth-helpers';
import { IUserModel } from './_models';
import { getUserByToken } from './_requests';

type User = IUserModel; // You can replace this 'any' with your User type/interface

type AuthContextType = {
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type IProps = {
  children: ReactNode;
};

function AuthInit({ children }: IProps) {
  const didRequest = useRef(false);
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Initialize user data on app load - check localStorage and sync with store
  useEffect(() => {
    const initializeUser = async () => {
      try {
        if (!didRequest.current) {
          const userTokenFromStorage = authHelper.getToken();

          const { data } = await getUserByToken(userTokenFromStorage || "");
          if (data) {
            const authData = {
              token: userTokenFromStorage,
              data: data,
            };
            setCurrentUser(authData);
            authHelper.setUser(authData);
          } else {
            setCurrentUser(null);
            authHelper.removeAuth();
          }
        }
      } catch (error) {
        console.log(error);
        setCurrentUser(null);
        authHelper.removeAuth();
      } finally {
        setShowSplashScreen(false);
        didRequest.current = true;
      }
    };

    initializeUser();
  }, []);

  // Login function
  const login = (user: User) => {
    setCurrentUser(user);
    authHelper.setUser(user);
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    authHelper.removeAuth();
  };

  if (showSplashScreen) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <div className='text-xl'>Loading...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Create a custom hook for easier access to AuthContext
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthInit provider");
  }
  return context;
}

export { AuthInit, AuthContext, useAuth };
