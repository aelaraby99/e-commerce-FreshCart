import React, { createContext, useState } from 'react'

export const authenticationContext = createContext();

export default function AuthenticationProvider({children}) {
  
  const [token, setToken] = useState(localStorage.getItem('token') || null);
    return (
    <authenticationContext.Provider value={{token,setToken}}>
      {children}
    </authenticationContext.Provider>
  )
}
