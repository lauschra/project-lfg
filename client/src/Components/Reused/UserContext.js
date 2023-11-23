import { createContext } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  //user state
  return (
    <UserContext.Provider
      value={
        {
          //user state
        }
      }
    >
      {children}
    </UserContext.Provider>
  );
};
