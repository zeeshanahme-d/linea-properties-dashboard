import {
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useAuthStore } from '../../store/auth-store';
import * as authHelper from './auth-helpers';

type IProps = {
  children: ReactNode;
};

function AuthInit({ children }: IProps) {
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  const logout = useAuthStore((state) => state.logout);
  const didRequest = useRef(false);
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [_, setIsVerifying] = useState(false);

  // Initialize user data on app load - check localStorage and sync with store
  useEffect(() => {
    const initializeUser = async () => {
      try {
        if (!didRequest.current) {
          setIsVerifying(true);

          // Check if user exists in localStorage
          const userFromStorage = authHelper.getUser();

          if (userFromStorage) {
            // User exists in localStorage - sync it to Zustand store
            setCurrentUser(userFromStorage);
          } else {
            // No user in localStorage - ensure store is clean (logout)
            logout();
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

    initializeUser();
  }, [setCurrentUser, logout]);

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

export { AuthInit };
