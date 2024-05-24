import { Box } from "@mui/material";
import SideBar from "./SideBar/SideBar";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { useNavigate, Outlet, useLocation } from "react-router-dom"
import { useEffect } from "react";
import { useAuth } from "../../utils/context";



export default function Layout() {
  const navigate = useNavigate()
  const activeLocation = useLocation()
  const {
    userData: {
      authData: {
        userInfo: { is_employe, is_admin },
      }
    },
  } = useAuth()

  useEffect(() => {
    if (is_employe) {
      if (
        activeLocation.pathname === '/'
        ||
        activeLocation.pathname === '/admin'
      ) {
        navigate('/');
      } else navigate(activeLocation.pathname)
    } else if (is_admin) {
      if (
        activeLocation.pathname === '/admin'
        ||
        activeLocation.pathname === '/'
      ) navigate('/admin');
    } else navigate('/login')
  }, [activeLocation.pathname, is_admin, is_employe, navigate])

  return (
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

  );
}
