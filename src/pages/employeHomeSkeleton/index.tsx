// Made by Poukam Ngamaleu

import { Outlet } from 'react-router'
import { useAuth } from '../../utils/context'

function EmployeSkeleton() {
  const {
    userData: {
      authData: {
        userInfo: { is_employe },
      }
    },
  } = useAuth()

  return (
    is_employe && (<Outlet />)
  )
}

export default EmployeSkeleton
