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
import { Link } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const StyledLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
})

function MenuSettings({ setIsDrawerOpen }: any) {
  const [openElUser, setOpenElUser] = useState(null)

  const handleOpenUserMenu = (event: any) => {
    setOpenElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setOpenElUser(null)
  }

  return (
    <Box>
      {/* <Tooltip title="Ouvrir paramètres"> */}
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
        <MenuItem sx={{ display: 'flex' }} onClick={handleCloseUserMenu}>
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
            to="#"
            paddingLeft="10px"
          >
            Paramètres
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ display: 'flex' }} onClick={handleCloseUserMenu}>
          <Logout fontSize="small" />
          <Typography textAlign="center" paddingLeft="15px">
            Déconnexion
          </Typography>
          {/* Waiting backend for account services */}
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default MenuSettings
