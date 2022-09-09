// Made by Poukam Ngamaleu

import { Box } from '@mui/system'
import Header from '../../components/header'
import { Outlet } from 'react-router'
import EmployeSideBar from '../../components/sideBar/sideBarEmploye'

function EmployeSkeleton() {
  return (
    <>
      <Header />
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 4fr' }}>
        <EmployeSideBar />
        <Box>
          <Outlet></Outlet>
        </Box>
      </Box>
    </>
  )
}

export default EmployeSkeleton
