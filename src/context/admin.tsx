/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, ReactNode } from "react";

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminContext = createContext<any>(null);

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <AdminContext.Provider value={{ handleLogout }}>
      {children}
    </AdminContext.Provider>
  );
};
