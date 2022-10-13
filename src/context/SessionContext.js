import { createContext, useContext, useState } from "react";
import { initialUserInfo } from "../data/initialStates";

const SessionContext = createContext(initialUserInfo);

const SessionProvider = ({ children }) => {
  const [userId] = useState(1);
  const [userPassword] = useState(1234);

  return (
    <SessionContext.Provider
      value={{
        userId,
        userPassword,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => useContext(SessionContext);

export default SessionProvider;
