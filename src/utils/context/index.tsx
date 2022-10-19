// Made by Poukam Ngamaleu
import React, { useReducer, createContext, useContext, Reducer } from 'react'

export interface AuthContextProviderProps {
  children: JSX.Element
}

export interface userInterface {
  nom: string
  prenom: string
  status: string
  poste: string
  email: string
  is_employe: boolean
  is_admin: boolean
  country: string
}

export interface authInterface {
  accessToken: string
  userInfo: userInterface
}

const sampleAuthContext: authInterface = {
  accessToken: '',
  userInfo: {
    nom: 'kamajou',
    prenom: 'paul',
    status: 'active',
    poste: 'Agent|NDE',
    is_employe: false,
    is_admin: true,
    country: 'cameroun',
    email: 'ngamaleu2011@gmail.com',
  },
}

interface dispatchInterface {
  authDispatch: React.Dispatch<authInterface>
}

const AuthContext = createContext<authInterface & dispatchInterface>({
  ...sampleAuthContext,
  authDispatch: () => null,
})

const authReducer: Reducer<authInterface & dispatchInterface, authInterface> = (
  state: authInterface & dispatchInterface,
  payload: authInterface
) => {
  return { ...state, ...payload }
}

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps): JSX.Element {
  const initialState: authInterface & dispatchInterface = {
    ...sampleAuthContext,
    authDispatch: () => null,
  }

  const [authState, authDispatch] = useReducer(authReducer, initialState)
  const value = { ...authState, authDispatch }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used as a descendant of AuthProvider')
  } else return context
}
