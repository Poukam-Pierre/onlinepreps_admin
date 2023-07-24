// Made by Poukam Ngamaleu

import Scrollbars, { positionValues } from 'react-custom-scrollbars'
import EmployeSideBar from '../../components/sideBar/sideBarEmploye'
import { useAuth } from '../../utils/context'
import Header from '../../components/header'
import { Outlet } from 'react-router'
import { Box } from '@mui/system'

function EmployeSkeleton() {
  const {
    userInfo: { is_employe },
  } = useAuth()

  return (
    is_employe && (
      <>
        <Header />
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 4fr' }}>
          <EmployeSideBar />
          <Scrollbars universal autoHide>
            <Outlet></Outlet>
          </Scrollbars>
        </Box>
      </>
    )
  )
}

export default EmployeSkeleton
