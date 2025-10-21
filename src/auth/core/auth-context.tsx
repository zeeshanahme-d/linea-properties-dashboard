import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { IAuthModel, IUserModel } from './_models';
// import { getUserByToken } from './_requests';
import * as authHelper from './auth-helpers';

type IProps = {
  children: ReactNode;
};

type AuthContextProps = {
  auth: IAuthModel | undefined;
  saveAuth: (auth: IAuthModel | undefined) => void;
  currentUser: IUserModel | undefined;
  setCurrentUser: Dispatch<SetStateAction<IUserModel | undefined>>;
  logout: () => void;
};

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => { },
  currentUser: undefined,
  setCurrentUser: () => { },
  logout: () => { },
};

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState);

const useAuth = () => {
  return useContext(AuthContext);
};

function AuthProvider({ children }: IProps) {
  const [auth, setAuth] = useState<IAuthModel | any>(authHelper.getAuth());
  const [currentUser, setCurrentUser] = useState<IUserModel | undefined>(authHelper.getUser());

  const saveAuth = useCallback((authData: IAuthModel | undefined) => {
    setAuth(authData);
    if (authData) {
      authHelper.setAuth(authData);
      authHelper.setUser(authData?.data);
    }
  }, []);

  const logout = () => {
    authHelper.removeAuth();
    saveAuth(undefined);
    setCurrentUser(undefined);
  };

  const values = useMemo(
    () => ({ auth, saveAuth, currentUser, setCurrentUser, logout }),
    [auth, currentUser, logout, saveAuth]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

function AuthInit({ children }: IProps) {
  const { auth, logout, setCurrentUser } = useAuth();
  const didRequest = useRef(false);
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [_, setIsVerifying] = useState(false);

  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    const requestUser = async (apiToken: string) => {
      try {
        if (!didRequest.current) {
          setIsVerifying(true);
          // const { data } = await getUserByToken(apiToken);
          const data = {
            _id: "1",
            firstName: "John",
            lastName: "Doe",
            email: "admin@gmail.com",
            role: "admin",
          };
          if (true) {
            setCurrentUser(data as IUserModel);
            authHelper.setUser(data as IUserModel);
            authHelper.setAuth({ api_token: apiToken, data: data });
          }
        }
      } catch (error) {
        if (!didRequest.current) {
          logout();
        }
      } finally {
        setIsVerifying(false);
        setShowSplashScreen(false);
      }

      didRequest.current = true;
    };

    if (auth && auth.api_token) {
      requestUser(auth.api_token);
    } else {
      // logout();
      setShowSplashScreen(false);
    }
  }, [auth, logout, setCurrentUser]);

  return showSplashScreen ? (
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
  ) : children;
}

export { AuthProvider, useAuth, AuthInit };
