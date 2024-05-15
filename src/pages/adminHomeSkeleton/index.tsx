// Made by Poukam Ngamaleu

import { Box } from '@mui/system'
import { Outlet } from 'react-router'
import AdminSideBar from '../../components/sideBar/sideBarAdmin'
import { useAuth } from '../../utils/context'
import SideBar from '../../components/Layout/SideBar/SideBar'
import Footer from '../../components/Layout/Footer/Footer'
// import Header from '../../components/header'
import Header from '../../components/Layout/Header/Header'

function AdminSkeleton() {
  const {
    userInfo: { is_admin },
  } = useAuth()

  return (
    is_admin && (
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        height: '100svh',
      }}>
        <SideBar />
        <Box sx={{
          display: 'grid',
          gridTemplateRows: 'auto 1fr auto'
        }}>
          <Header />
          <Outlet></Outlet>
          <Footer />
        </Box>
      </Box>
      // <>
      //   <Header />
      //   <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 4fr' }}>
      //     <AdminSideBar />
      //     <Box>
      //       <Outlet></Outlet>
      //     </Box>
      //   </Box>
      // </>
    )
  )
}

export default AdminSkeleton
