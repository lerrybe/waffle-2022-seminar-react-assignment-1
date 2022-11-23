import { createContext, useContext, useState } from 'react';
import axios from 'axios';

import { toast } from 'react-toastify';

// functions
import { requestOwnerMe } from '../api/owners';
import { clearAll, saveObjItem } from '../services/storage';
import { requestLogin, requestLogout, requestRefresh } from '../api/auth';

// states
import { initialUser, initialUserActions } from '../data/initialSessionStates';

// Types
import {
  SessionDispatches,
  SessionState,
} from '../types/context/session-states';
import { LoginRequest, Owner } from '../types/auth';

const SessionContext = createContext<SessionState | null>(initialUser);
const SessionActionsContext = createContext<SessionDispatches | null>(
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

  const refresh = async () => {
    try {
      // DESC: refresh - access_token 갱신
      const refreshData = await requestRefresh();
      if (refreshData) {
        setAccessToken(refreshData?.access_token);
        const token = refreshData.access_token;

        // DESC: accessToken 이용한 내 정보 갱신
        const ownerData = await requestOwnerMe(token);
        if (ownerData) {
          setUser(ownerData?.owner);
          saveObjItem('user', ownerData?.owner);
        }
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        // DESC: 갱신이 실패한 경우 사용자에게 안내
        toast.error(e.response?.data.message);
      }
      return;
    }
  };

  return (
    <SessionActionsContext.Provider value={{ login, logout, refresh }}>
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
