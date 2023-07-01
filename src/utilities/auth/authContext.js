import React from "react";

const AuthContext = React.createContext();

export const AuthProvider = ({ children, values = {} }) => {
  return (
    <AuthContext.Provider values={values}>{children}</AuthContext.Provider>
  );
};

export function useAuthValues() {
  return React.useContext(AuthContext) || {};
}
