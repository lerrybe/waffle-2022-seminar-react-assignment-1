import { createContext, useContext, useState } from 'react';

import { saveItem } from '../services/storage';
import { requestLogin, requestLogout } from '../api/auth';
import { initialUser, initialUserActions } from '../data/initialSessionStates';

const SessionContext = createContext(initialUser);
const SessionActionsContext = createContext(initialUserActions);

function SessionProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(false);

  const login = async ({ id, password }) => {
    const userData = await requestLogin({ id, password });

    if (userData) {
      setIsLoggedIn(true);
      setUser(userData?.owner);
      setAccessToken(userData?.access_token);

      saveItem('username', userData?.owner.username);
      saveItem('isLoggedIn', true);
    }
  };

  const logout = async () => {
    requestLogout();
    setUser(null);
    setIsLoggedIn(false);
    setAccessToken(null);
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
