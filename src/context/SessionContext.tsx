import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';

// functions
import { clearAll, saveObjItem } from '../services/storage';
import { requestLogin, requestLogout } from '../api/auth';

// states of types
import {
  State,
  Dispatches,
  initialUser,
  initialUserActions,
} from '../data/initialSessionStates';
import { LoginRequest, Owner } from '../types/auth';

const SessionContext = createContext<State | null>(initialUser);
const SessionActionsContext = createContext<Dispatches | null>(
  initialUserActions,
);

interface SessionProvider {
  children: React.ReactNode;
}

function SessionProvider({ children }: SessionProvider) {
  const [user, setUser] = useState<Owner | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const login = async ({ username, password }: LoginRequest) => {
    try {
      const userData = await requestLogin({ username, password });

      if (userData) {
        toast.success(`${username}님, 환영합니다!`, {
          theme: 'colored',
        });

        setUser(userData?.owner);
        setAccessToken(userData?.access_token);
        saveObjItem('user', userData?.owner);
      }
    } catch (err) {
      console.log(err);
    }
    return;
  };

  const logout = async (accessToken: string) => {
    const res = await requestLogout(accessToken);
    if (res) {
      clearAll();
      setUser(null);
      setAccessToken(null);

      toast.info('로그아웃 되었습니다.');
    }
    return;
  };

  return (
    <SessionActionsContext.Provider value={{ login, logout }}>
      <SessionContext.Provider
        value={{
          user,
          accessToken,
        }}
      >
        {children}
      </SessionContext.Provider>
    </SessionActionsContext.Provider>
  );
}

export const useSessionContext = () => useContext(SessionContext);
export const useSessionActionsContext = () => useContext(SessionActionsContext);

export default SessionProvider;
