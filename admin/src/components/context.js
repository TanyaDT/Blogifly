import React, { useEffect } from "react";
import { createContext, useState } from "react";

export const AdminContext = createContext();
export default function UserProvider({ children }) {
  const [adminData, setAdminData] = useState(
    localStorage.getItem("adminData")
      ? JSON.parse(localStorage.getItem("adminData"))
      : null
  );

  useEffect(() => {
    localStorage.setItem("adminData", JSON.stringify(adminData));
  }, [adminData]);
    console.log("Hello",adminData); 
  return (
    <AdminContext.Provider value={{ adminData, setAdminData }}>
      {children}
    </AdminContext.Provider>
  );
}
