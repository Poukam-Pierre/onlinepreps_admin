// Made by Poukam Ngamaleu

import { Navigate, Outlet } from 'react-router'
import { useContext } from 'react'
import { AuthContext } from '../../utils/context'

function PrivateRoutes() {
  const { isLogin }: any = useContext(AuthContext)

  return isLogin ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoutes
