// Made by Poukam Ngamaleu
import React, { useState, createContext } from 'react'

export const AuthContext = createContext<boolean | unknown>(undefined)

export function AuthProvider({ children }: any) {
  const [isLogin, setIsLogin] = useState<boolean>(false)
  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  )
}
