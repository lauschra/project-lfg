import { useState, createContext, useEffect } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUserMod] = useState(storedUser);
  
  //I did this so the storage gets updated as user gets set. I know this is not ideal but it's the work around I have for now
  const setUser = (setter) => {
    setUserMod(setter)
    localStorage.setItem("user", JSON.stringify(setter));
  }

  user ? console.log(`user: ${user.userName}`) : console.log("user: none");

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        storedUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
