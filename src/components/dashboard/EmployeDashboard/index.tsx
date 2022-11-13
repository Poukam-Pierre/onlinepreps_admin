// Made by Poukam Ngamaleu

import { Box, Paper, Typography } from '@mui/material'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Link } from 'react-router-dom'
import { theme } from '../../../utils/style/theme'
import ActionTable from './employActionTable'
import { useState, useEffect } from 'react'
import { useAuth } from '../../../utils/context'
import Axios from 'axios'

function EmployeDashboard() {
  const {
    userInfo: { id },
  } = useAuth()

  useEffect(() => {
    // TODO fetch data information
    Axios.get(``)
      .then((res) => {})
      .catch((err) => {})
  }, [])

  return (
    <Box p={3}>
      <Typography variant="h4" color="#555">
        Tableau de bord
      </Typography>
      <Box display="flex" justifyContent="space-around" padding="50px 0 0 0">
        <Paper sx={{ padding: '20px', width: '20rem', bgcolor: '#F5F0F0' }}>
          <Box
            display="flex"
            justifyContent="space-between"
            paddingBottom="20px"
          >
            <Typography variant="h5" color="#555">
              Epreuves créées
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              color={theme.palette.secondary.main}
            >
              <ExpandLessIcon />
              <Typography>+ 5%</Typography>
            </Box>
          </Box>
          <Typography variant="h4" fontWeight="bold" paddingBottom="20px">
            10
          </Typography>
          <Box
            component={Link}
            to="/epreuves"
            color={theme.palette.primary.main}
            sx={{ '& :hover': { color: theme.palette.secondary.main } }}
          >
            <Typography>Liste des épreuves créées</Typography>
          </Box>
        </Paper>
        <Paper sx={{ padding: '20px', width: '20rem', bgcolor: '#F5F0F0' }}>
          <Box
            display="flex"
            justifyContent="space-between"
            paddingBottom="20px"
          >
            <Typography variant="h5" color="#555">
              Epreuves achetées
            </Typography>
            <Box display="flex" alignItems="center" color="red">
              <ExpandMoreIcon />
              <Typography>+5%</Typography>
            </Box>
          </Box>
          <Typography variant="h4" fontWeight="bold" paddingBottom="20px">
            50
          </Typography>
          <Box
            component={Link}
            to="/achat"
            color={theme.palette.primary.main}
            sx={{ '& :hover': { color: theme.palette.secondary.main } }}
          >
            <Typography>Liste des épreuves achetées</Typography>
          </Box>
        </Paper>
      </Box>
      <Box paddingTop="30px">
        <Typography variant="h5" color="#555" padding="0 0  20px 2px">
          Dernières transactions
        </Typography>
        <Box display="flex" justifyContent="center">
          <ActionTable />
        </Box>
      </Box>
    </Box>
  )
}

export default EmployeDashboard
