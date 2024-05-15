// Made by Poukam Ngamaleu

import { Box } from '@mui/system'
import { Outlet } from 'react-router'
import Footer from '../../components/Layout/Footer/Footer'
import SideBar from '../../components/Layout/SideBar/SideBar'
import { useAuth } from '../../utils/context'
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
    )
  )
}

export default AdminSkeleton
