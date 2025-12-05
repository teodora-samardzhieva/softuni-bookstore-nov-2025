import { createContext, useContext, useState } from "react";
import useRequest from "../hooks/useRequest.js";
import usePersistedState from "../hooks/usePersistedState.js";

const UserContext = createContext({
  isAuthenticated: false,
  user: {
    username: "",
    email: "",
    password: "",
    _createdOn: 0,
    _id: "",
    accessToken: "",
  },
  registerHandler() {},
  loginHandler() {},
  logoutHandler() {},
});

export function UserProvider({ children }) {
  const [user, setUser] = usePersistedState(null);
  const { request } = useRequest();

  // Register new user
  const registerHandler = async (username, email, password) => {
    const newUser = {
      username,
      email,
      password,
    };
    // Register Api call
    const result = await request("/users/register", "POST", newUser);

    // Login user after register
    setUser(result);
  };

  const loginHandler = async (email, password) => {
    const result = await request("/users/login", "POST", {
      email,
      password,
    });

    setUser(result);
  };

  // const logoutHandler = () => {
  //     return request('/users/logout', 'GET', null, {accessToken: user.accessToken})
  //         .finally(() => setUser(null));
  // };

  const logoutHandler = () => {
    if (!user) {
      return Promise.resolve(); // nothing to do
    }

    return request("/users/logout", "GET", null, {
      accessToken: user.accessToken,
    }).finally(() => setUser(null));
  };

  const userContextValues = {
    user,
    isAuthenticated: !!user?.accessToken,
    registerHandler,
    loginHandler,
    logoutHandler,
  };

  return (
    <UserContext.Provider value={userContextValues}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
    const contextData = useContext(UserContext);
    
    return contextData;
}

export default UserContext;
