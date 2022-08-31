// Made by Poukam Ngamaleu

import { Box } from '@mui/system'
import Header from '../../components/header'
import { Outlet } from 'react-router'
import AdminSideBar from '../../components/sideBar/sideBarAdmin'

function AdminSkeleton() {
  return (
    <>
      <Header />
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 4fr' }}>
        <AdminSideBar />
        <Box>
          <Outlet></Outlet>
        </Box>
      </Box>
    </>
  )
}

export default AdminSkeleton
