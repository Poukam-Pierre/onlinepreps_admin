// Made by Poukam Ngamaleu

import { Box, Paper, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { theme } from '../../../utils/style/theme'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Charts from './charts'
import ActionAdminTable from './actionAdminTable'
function AdminDashboard() {
  return (
    <Box p={3}>
      <Typography variant="h4" color="#555">
        Tableau de bord
      </Typography>
      <Box display="flex" justifyContent="space-around" padding="50px 0 0 0">
        <Paper sx={{ padding: '20px', width: '15rem', bgcolor: '#F5F0F0' }}>
          <Typography variant="h5" color="#555" paddingBottom="20px">
            Employes
          </Typography>
          <Typography variant="h4" fontWeight="bold" paddingBottom="20px">
            10
          </Typography>
          <Box
            component={Link}
            to=""
            color={theme.palette.primary.main}
            sx={{ '& :hover': { color: theme.palette.secondary.main } }}
          >
            <Typography>Liste des employes</Typography>
          </Box>
        </Paper>
        <Paper sx={{ padding: '20px', width: '15rem', bgcolor: '#F5F0F0' }}>
          <Box
            display="flex"
            justifyContent="space-between"
            paddingBottom="20px"
          >
            <Typography variant="h5" color="#555">
              Partenaires
            </Typography>
            <Box display="flex" alignItems="center" color="red">
              <ExpandMoreIcon />
              <Typography>+5%</Typography>
            </Box>
          </Box>
          <Typography variant="h4" fontWeight="bold" paddingBottom="20px">
            30
          </Typography>
          <Box
            component={Link}
            to=""
            color={theme.palette.primary.main}
            sx={{ '& :hover': { color: theme.palette.secondary.main } }}
          >
            <Typography>Liste des partenaires</Typography>
          </Box>
        </Paper>
        <Paper sx={{ padding: '20px', width: '15rem', bgcolor: '#F5F0F0' }}>
          <Box
            display="flex"
            justifyContent="space-between"
            paddingBottom="20px"
          >
            <Typography variant="h5" color="#555">
              Apprenant
            </Typography>
            <Box display="flex" alignItems="center" color="red">
              <ExpandMoreIcon />
              <Typography>5%</Typography>
            </Box>
          </Box>
          <Typography variant="h4" fontWeight="bold" paddingBottom="20px">
            500
          </Typography>
        </Paper>
        <Paper sx={{ padding: '20px', width: '15rem', bgcolor: '#F5F0F0' }}>
          <Box
            display="flex"
            justifyContent="space-between"
            paddingBottom="20px"
          >
            <Typography variant="h5" color="#555">
              Epreuves
            </Typography>
            <Box display="flex" alignItems="center" color="red">
              <ExpandMoreIcon />
              <Typography>5%</Typography>
            </Box>
          </Box>
          <Typography variant="h4" fontWeight="bold" paddingBottom="20px">
            1000
          </Typography>
          <Box
            component={Link}
            to=""
            color={theme.palette.primary.main}
            sx={{ '& :hover': { color: theme.palette.secondary.main } }}
          >
            <Typography>Liste des epreuves</Typography>
          </Box>
        </Paper>
      </Box>
      <Box paddingTop="15px" component={Paper} marginTop="30px">
        <Typography variant="h5" color="#555" padding="0 0  20px 50px">
          Graphe d'abonnement
        </Typography>
        <Box display="flex" justifyContent="center" height="25rem" padding={1}>
          <Charts />
        </Box>
      </Box>
      <Box padding="30px 0 0 0">
        <Typography variant="h5" color="#555" padding="0 0  20px 50px">
          Dernieres transactions
        </Typography>
        <Box display="flex" justifyContent="center">
          <ActionAdminTable />
        </Box>
      </Box>
    </Box>
  )
}

export default AdminDashboard
