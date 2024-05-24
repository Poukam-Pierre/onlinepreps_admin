import { createContext } from 'react'
import { Authentication } from './login.interface'

export const AuthContext = createContext<Authentication>({
  userData: {
    authData: {
      accessToken: '',
      userInfo: {
        id: undefined,
        nom: '',
        prenom: '',
        email: '',
      },
    },
    isLoading: true,
  },
  authDispatch: () => null,
})

export default AuthContext
