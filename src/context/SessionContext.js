import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { initialUser, initialUserActions } from "../data/initialSessionStates";

import { loadItem } from "../services/storage";

const SessionContext = createContext(initialUser);
const SessionActionsContext = createContext(initialUserActions);

const SessionProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const actions = useMemo(
    () => ({
      dispatchUserId(userId) {
        setUserId(userId);
      },
      dispatchIsLoggedIn(isLoggedIn) {
        setIsLoggedIn(isLoggedIn);
      },
    }),
    []
  );

  useEffect(() => {
    actions.dispatchUserId(loadItem("userId"));
    actions.dispatchIsLoggedIn(loadItem("isLoggedIn"));
  }, [actions]);

  return (
    <SessionActionsContext.Provider value={actions}>
      <SessionContext.Provider
        value={{
          userId,
          isLoggedIn,
        }}
      >
        {children}
      </SessionContext.Provider>
    </SessionActionsContext.Provider>
  );
};

export const useSessionContext = () => useContext(SessionContext);
export const useSessionActionsContext = () => useContext(SessionActionsContext);

export default SessionProvider;
