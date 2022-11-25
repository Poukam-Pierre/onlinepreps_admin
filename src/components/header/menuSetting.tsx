// Made by Poukam Ngamaleu

import { Logout, Settings } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useAuth } from '../../utils/context'

const StyledLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
})

function MenuSettings({ setIsDrawerOpen }: any) {
  const [openElUser, setOpenElUser] = useState(null)

  const {
    authDispatch,
    userInfo: { is_admin },
  } = useAuth()
  const navigate = useNavigate()

  const handleOpenUserMenu = (event: any) => {
    setOpenElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setOpenElUser(null)
  }

  const disconnected = () => {
    authDispatch({
      accessToken: '',
      userInfo: {
        id: undefined,
        nom: '',
        prenom: '',
        email: '',
      },
    })
    navigate('/login')
  }

  return (
    <Box>
      <IconButton
        onClick={handleOpenUserMenu}
        sx={{ display: { xs: 'none', md: 'inline-flex' }, gap: '10px' }}
      >
        <Avatar alt="Poukam Marc" src="/static/images/avatar/2.jpg" />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={openElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(openElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem
          sx={{ display: 'flex' }}
          onClick={handleCloseUserMenu}
          disabled={is_admin}
        >
          <AccountCircleIcon fontSize="small" />
          <Typography
            textAlign="center"
            component={StyledLink}
            to="/profil"
            paddingLeft="10px"
          >
            Profile
          </Typography>
        </MenuItem>
        <MenuItem sx={{ display: 'flex' }} onClick={handleCloseUserMenu}>
          <Settings fontSize="small" />
          <Typography
            textAlign="center"
            component={StyledLink}
            to="/admin/settings"
            paddingLeft="10px"
          >
            Paramètres
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ display: 'flex' }} onClick={disconnected}>
          <Logout fontSize="small" />
          <Typography textAlign="center" paddingLeft="15px">
            Déconnexion
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default MenuSettings
