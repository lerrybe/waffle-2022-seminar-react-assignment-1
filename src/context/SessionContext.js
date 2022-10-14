import { createContext, useContext, useEffect, useState } from "react";
import { initialUserInfo } from "../data/initialStates";
import { loadItem } from "../services/storage";

const SessionContext = createContext(initialUserInfo);

const SessionProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setIsLoggedIn(loadItem("isLoggedIn"));
    setUserId(loadItem("userId"));
  }, []);

  return (
    <SessionContext.Provider
      value={{
        isLoggedIn,
        userId,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => useContext(SessionContext);

export default SessionProvider;
