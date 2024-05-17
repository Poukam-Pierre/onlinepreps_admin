// Made by Poukam Ngamaleu

import { useAuth } from '../../utils/context'
import { useEffect } from 'react'
import { useNavigate, Outlet, useLocation } from "react-router-dom"

function PrivateRoutes() {
  const {
    userInfo: { is_employe, is_admin },
  } = useAuth()

  const navigate = useNavigate()
  const activeLocation = useLocation()

  useEffect(() => {
    if (is_employe) {
      if (activeLocation.pathname === '/') navigate('/')
      navigate(activeLocation.pathname)
    } else if (is_admin) {
      if (activeLocation.pathname === '/') {
        navigate('/admin')
      } else if (activeLocation.pathname === '/admin')
        navigate(activeLocation.pathname)
      else return
    } else navigate('/login')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <Outlet />
}

export default PrivateRoutes
