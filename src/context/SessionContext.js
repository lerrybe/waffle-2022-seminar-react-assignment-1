import { createContext, useContext, useState } from 'react';

import { toast } from 'react-toastify';

import { saveItem, clearAll } from '../services/storage';
import { requestLogin, requestLogout } from '../api/auth';
import { initialUser, initialUserActions } from '../data/initialSessionStates';

const SessionContext = createContext(initialUser);
const SessionActionsContext = createContext(initialUserActions);

function SessionProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);

  const login = async ({ id, password }) => {
    try {
      const userData = await requestLogin({ id, password });

      if (userData) {
        toast.success(`${id}님, 환영합니다!`, {
          theme: 'colored',
        });

        setIsLoggedIn(true);
        setUser(userData?.owner);
        setAccessToken(userData?.access_token);

        saveItem('username', userData?.owner.username);
        saveItem('isLoggedIn', true);

        return true;
      }
      toast.error('로그인에 실패했습니다.', {
        theme: 'colored',
      });
    } catch (err) {
      console.log(err);
    }

    return false;
  };

  const logout = async () => {
    await requestLogout();
    clearAll();
    setUser(null);
    setIsLoggedIn(false);
    setAccessToken(null);

    toast.info('로그아웃 되었습니다.');
  };

  return (
    <SessionActionsContext.Provider value={{ login, logout }}>
      <SessionContext.Provider
        value={{
          user,
          isLoggedIn,
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
