// Made by Poukam Ngamaleu
import React, { useReducer, createContext, useContext, Reducer } from 'react'

export interface AuthContextProviderProps {
  children: JSX.Element
}

export interface userInterface {
  id: number | undefined
  nom: string
  prenom: string
  email: string
  is_employe?: boolean
  is_admin?: boolean
  profil_img?: string
  status?: string
  poste?: string
  country?: string
  phoneNumber?: string
  adresse?: string
  birthDate?: string
}

export interface authInterface {
  accessToken: string
  userInfo: userInterface
}

const sampleAuthContext: authInterface = {
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ5b21ldGNobWFyQGdtYWlsLmNvbSIsInVzZXJJZCI6MTI0LCJpYXQiOjE2NjgzNjU4MTksImV4cCI6MTY2ODQ1MjIxOX0.L4JTj8e1B7BiJbbymTW0aKhT7yfxwKqx4EhzXw0kYJM',
  userInfo: {
    id: 154,
    nom: 'ngamaleu',
    email: 'ngamaleu2011@gmail.com',
    prenom: 'pierre Irénée',
    is_employe: true,
    is_admin: true,
    status: 'active',
    country: 'cameroun',
    poste: 'agent | Mifi',
    phoneNumber: '+237696841451',
    birthDate: ' 03 Avril 1996',
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
  localStorage.setItem('auth', JSON.stringify({ ...state, ...payload }))
  return { ...state, ...payload }
}
const authStatus = localStorage.getItem('auth')
export default function AuthContextProvider({
  children,
}: AuthContextProviderProps): JSX.Element {
  const initialState: authInterface & dispatchInterface = {
    accessToken: authStatus
      ? (JSON.parse(authStatus?.toString()) as authInterface).accessToken
      : sampleAuthContext.accessToken,
    userInfo: authStatus
      ? (JSON.parse(authStatus?.toString()) as authInterface).userInfo
      : sampleAuthContext.userInfo,
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
