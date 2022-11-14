import { createContext, useContext, useState } from 'react';

import { toast } from 'react-toastify';

import { clearAll, saveObjItem } from '../services/storage';
import { requestLogin, requestLogout } from '../api/auth';
import { initialUser, initialUserActions } from '../data/initialSessionStates';

const SessionContext = createContext(initialUser);
const SessionActionsContext = createContext(initialUserActions);

function SessionProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const login = async ({ name, password }) => {
    try {
      const userData = await requestLogin({ name, password });

      if (userData) {
        toast.success(`${name}님, 환영합니다!`, {
          theme: 'colored',
        });

        setUser(userData?.owner);
        setAccessToken(userData?.access_token);

        saveObjItem('user', userData?.owner);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async (accessToken) => {
    const res = await requestLogout(accessToken);

    if (res) {
      clearAll();
      setUser(null);
      setAccessToken(null);

      toast.info('로그아웃 되었습니다.');
    }
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
