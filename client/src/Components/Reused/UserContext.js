import { useState, createContext, useEffect } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const defaultUserState = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(defaultUserState);

  user ? console.log(`user: ${user.userName}`) : console.log("user: none");

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
