// Made by Poukam Ngamaleu

import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { theme } from '../../../utils/style/theme'
import DashboardIcon from '@mui/icons-material/Dashboard'
import TextsmsIcon from '@mui/icons-material/Textsms'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import HandshakeIcon from '@mui/icons-material/Handshake'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import TimelineIcon from '@mui/icons-material/Timeline'
import { StyledLink } from '../sideBarEmploye'

function AdminSideBar() {
  return (
    <Box
      p={3}
      sx={{
        height: 'calc(100vh - 168px)',
        bgcolor: theme.palette.primary.light,
        position: 'sticky',
        top: '120px',
      }}
    >
      <Box
        sx={{
          color: theme.palette.secondary.contrastText,
          paddingBottom: '25px',
        }}
      >
        <Typography variant="h6" fontSize="0.8rem" color="#AFB0B0">
          ACCUEIL
        </Typography>
        <MenuList>
          <MenuItem sx={{ gap: '10px' }} component={StyledLink} to="">
            <ListItemIcon sx={{ color: '#F5FA05' }}>
              <DashboardIcon sx={{ fontSize: 30 }} />
            </ListItemIcon>
            <ListItemText
              sx={{ '& .MuiTypography-root': { fontSize: '1.2rem' } }}
            >
              Tableau de bord
            </ListItemText>
          </MenuItem>
        </MenuList>
      </Box>
      <Box
        sx={{
          color: theme.palette.secondary.contrastText,
          paddingBottom: '25px',
        }}
      >
        <Typography variant="h6" fontSize="0.8rem" color="#AFB0B0">
          ACCES RAPIDE
        </Typography>
        <MenuList>
          <MenuItem sx={{ gap: '10px' }} component={StyledLink} to="">
            <ListItemIcon sx={{ color: '#F5FA05' }}>
              <AccountCircleIcon sx={{ fontSize: 30 }} />
            </ListItemIcon>
            <ListItemText
              sx={{ '& .MuiTypography-root': { fontSize: '1.2rem' } }}
            >
              Employés
            </ListItemText>
          </MenuItem>
          <MenuItem sx={{ gap: '10px' }} component={StyledLink} to="">
            <ListItemIcon sx={{ color: '#F5FA05' }}>
              <HandshakeIcon sx={{ fontSize: 30 }} />
            </ListItemIcon>
            <ListItemText
              sx={{ '& .MuiTypography-root': { fontSize: '1.2rem' } }}
            >
              Partenaires
            </ListItemText>
          </MenuItem>
        </MenuList>
      </Box>
      <Box
        sx={{
          color: theme.palette.secondary.contrastText,
          paddingBottom: '25px',
        }}
      >
        <Typography variant="h6" fontSize="0.8rem" color="#AFB0B0">
          NOTIFICATIONS
        </Typography>
        <MenuList>
          <MenuItem sx={{ gap: '10px' }} component={StyledLink} to="">
            <ListItemIcon sx={{ color: '#F5FA05' }}>
              <TextsmsIcon sx={{ fontSize: 30 }} />
            </ListItemIcon>
            <ListItemText
              sx={{ '& .MuiTypography-root': { fontSize: '1.2rem' } }}
            >
              Messages
            </ListItemText>
          </MenuItem>
        </MenuList>
      </Box>
      <Box
        sx={{
          color: theme.palette.secondary.contrastText,
          paddingBottom: '25px',
        }}
      >
        <Typography variant="h6" fontSize="0.8rem" color="#AFB0B0">
          STUFF
        </Typography>
        <MenuList>
          <MenuItem sx={{ gap: '10px' }} component={StyledLink} to="">
            <ListItemIcon sx={{ color: '#F5FA05' }}>
              <LocalMallIcon sx={{ fontSize: 30 }} />
            </ListItemIcon>
            <ListItemText
              sx={{ '& .MuiTypography-root': { fontSize: '1.2rem' } }}
            >
              Manager
            </ListItemText>
          </MenuItem>
          <MenuItem sx={{ gap: '10px' }} component={StyledLink} to="">
            <ListItemIcon sx={{ color: '#F5FA05' }}>
              <TimelineIcon sx={{ fontSize: 30 }} />
            </ListItemIcon>
            <ListItemText
              sx={{ '& .MuiTypography-root': { fontSize: '1.2rem' } }}
            >
              Statistiques
            </ListItemText>
          </MenuItem>
        </MenuList>
      </Box>
    </Box>
  )
}

export default AdminSideBar
