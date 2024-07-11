import React, { useState } from "react";
import Auth from "./auth";
import AuthContext from "./AuthContext";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signin = (newUser, callback) => {
    return Auth.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  const signout = (callback) => {
    return Auth.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
