// Made by Poukam Ngamaleu

import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  styled,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { theme } from '../../../utils/style/theme'
import DashboardIcon from '@mui/icons-material/Dashboard'
import TextSnippetIcon from '@mui/icons-material/TextSnippet'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed'
import TextsmsIcon from '@mui/icons-material/Textsms'
import { Link } from 'react-router-dom'

export const StyledLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
})

function EmployeSideBar() {
  return (
    <Box
      p={3}
      sx={{
        height: 'calc(100vh - 168px)',
        bgcolor: theme.palette.primary.light,
        position: 'sticky',
        top: '115px',
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
          <MenuItem sx={{ gap: '10px' }} component={StyledLink} to="/epreuves">
            <ListItemIcon sx={{ color: '#F5FA05' }}>
              <TextSnippetIcon sx={{ fontSize: 30 }} />
            </ListItemIcon>
            <ListItemText
              sx={{ '& .MuiTypography-root': { fontSize: '1.2rem' } }}
            >
              Epreuves
            </ListItemText>
          </MenuItem>
          <MenuItem sx={{ gap: '10px' }} component={StyledLink} to="/achat">
            <ListItemIcon sx={{ color: '#F5FA05' }}>
              <ShoppingCartIcon sx={{ fontSize: 30 }} />
            </ListItemIcon>
            <ListItemText
              sx={{ '& .MuiTypography-root': { fontSize: '1.2rem' } }}
            >
              Achats
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
              <DynamicFeedIcon sx={{ fontSize: 30 }} />
            </ListItemIcon>
            <ListItemText
              sx={{ '& .MuiTypography-root': { fontSize: '1.2rem' } }}
            >
              Feedback
            </ListItemText>
          </MenuItem>
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
    </Box>
  )
}

export default EmployeSideBar
