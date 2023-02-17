// Made by Poukam Ngamaleu

import { Box, Paper, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { theme } from '../../../utils/style/theme'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Charts from './charts'
import ActionAdminTable from './actionAdminTable'
import { useState, useEffect } from 'react'
import Axios from 'axios'

interface dashDataInterface {
  employeNber: number
  partnerNber: number
  studentsNber: number
  testSheetNber: number
}

function AdminDashboard() {
  const [dashData, setDashData] = useState<dashDataInterface>({
    employeNber: 0,
    partnerNber: 0,
    studentsNber: 0,
    testSheetNber: 0,
  })
  useEffect(() => {
    // TODO change local link to remote link
    Axios.get(`${process.env.REACT_APP_URL_REMOTE_LINK}/admin/getStatAdmin`)
      .then((res) => {
        if (res?.status === 200) {
          setDashData(res.data)
        }
      })
      .catch((err) => {
        return
      })
  }, [])

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
            {dashData.employeNber}
          </Typography>
          <Box
            component={Link}
            to="/admin/employes"
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
            {/* <Box display="flex" alignItems="center" color="red">
              <ExpandMoreIcon />
              <Typography>+5%</Typography>
            </Box> */}
          </Box>
          <Typography variant="h4" fontWeight="bold" paddingBottom="20px">
            {dashData.partnerNber}
          </Typography>
          <Box
            component={Link}
            to="/admin/partner"
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
              Apprenants
            </Typography>
            {/* <Box display="flex" alignItems="center" color="red">
              <ExpandMoreIcon />
              <Typography>5%</Typography>
            </Box> */}
          </Box>
          <Typography variant="h4" fontWeight="bold" paddingBottom="20px">
            {dashData.studentsNber}
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
            {/* <Box display="flex" alignItems="center" color="red">
              <ExpandMoreIcon />
              <Typography>5%</Typography>
            </Box> */}
          </Box>
          <Typography variant="h4" fontWeight="bold" paddingBottom="20px">
            {dashData.testSheetNber}
          </Typography>
          <Box
            component={Link}
            to="/admin/epreuves"
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
      {/* <Box padding="30px 0 0 0">
        <Typography variant="h5" color="#555" padding="0 0  20px 50px">
          Dernieres transactions
        </Typography>
        <Box display="flex" justifyContent="center">
          <ActionAdminTable />
        </Box>
      </Box> */}
    </Box>
  )
}

export default AdminDashboard
