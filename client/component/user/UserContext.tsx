/* Author(s): Securella */
import React, { createContext, useContext, useState } from "react";

interface UserContextType {
  username: string;
  setUsername: (name: string) => void;
}

const UserContext = createContext<UserContextType>({
  username: "User",
  setUsername: () => {}
});

export const UserProvider: React.FC = ({ children }) => {
  const [username, setUsername] = useState("User");
  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
