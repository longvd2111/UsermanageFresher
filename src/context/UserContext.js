import { react, createContext, useState } from "react";

const UserContext = createContext({ email: "", auth: false });
// This also works: const UserContext = createContext();

const UserProvider = ({ children }) => {
  // User is the email of the "data" that gets stored in context
  const [user, setUser] = useState({ email: "", auth: true });

  // Login updates the user data with a name parameter
  const loginContext = (email, token) => {
    setUser((user) => ({
      email: email,
      auth: true,
    }));
    localStorage.setItem("token", token);
  };

  // Logout updates the user data to default
  const logout = () => {
    setUser((user) => ({
      email: "",
      auth: false,
    }));
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
