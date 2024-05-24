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
  status_connected?: string
}

export interface authInterface {
  accessToken: string
  userInfo: userInterface
}

export interface Authentication {
  userData: authInterface
  authDispatch: React.Dispatch<authInterface>
}

export type StateLogin = Authentication
