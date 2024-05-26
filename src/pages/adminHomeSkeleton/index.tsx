// Made by Poukam Ngamaleu

import { Outlet } from 'react-router'
import { useAuth } from '../../utils/context'

function AdminSkeleton() {
  const {
    userData: {
      userInfo: { is_admin },
    },
  } = useAuth()

  return (
    is_admin && (<Outlet />)
  )
}

export default AdminSkeleton
