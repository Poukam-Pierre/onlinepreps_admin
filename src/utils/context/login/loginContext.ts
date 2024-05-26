import { createContext } from 'react'
import { Authentication } from './login.interface'

export const AuthContext = createContext<Authentication>({
  userData: {
    accessToken: '',
    userInfo: {
      id: undefined,
      nom: '',
      prenom: '',
      email: '',
    },
  },
  authDispatch: () => null,
})

export default AuthContext
