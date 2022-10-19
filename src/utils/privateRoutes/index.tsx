// Made by Poukam Ngamaleu

import { useAuth } from '../../utils/context'
import { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'

function PrivateRoutes() {
  const {
    userInfo: { is_employe, is_admin },
  } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (is_employe) navigate('/')
    else if (is_admin) {
      navigate('/admin')
    } else navigate('/auth')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <Outlet />
}

export default PrivateRoutes
