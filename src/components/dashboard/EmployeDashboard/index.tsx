// Made by Poukam Ngamaleu

import { Box, Paper, Typography } from '@mui/material'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { useAuth } from '../../../utils/context'
import { theme } from '../../../utils/style/theme'
import ActionTable from './employActionTable'

function EmployeDashboard() {
  const [nberTestCreated, setNberTestCreated] = useState<number>()
  const [nberTestBaught, setNbreTestBaught] = useState<number>()
  const {
    userData: {
      authData: {
        userInfo: { id }
      }
    }
  } = useAuth()

  useEffect(() => {
    // TODO change local link to remote link
    Axios.get(
      `${process.env.REACT_APP_URL_REMOTE_LINK}/employe/getNberTestCreated/${id}`
    )
      .then((res) => {
        if (res?.status === 200 && res.data) {
          setNberTestCreated(res.data.length)
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setNberTestCreated(0)
        }
      })
    Axios.get(
      `${process.env.REACT_APP_URL_REMOTE_LINK}/employe/getNberTestBaught/${id}`
    )
      .then((res) => {
        if (res?.status === 200 && res.data) {
          setNbreTestBaught(res.data.length)
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setNbreTestBaught(0)
        }
      })
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
          </Box>
          <Typography variant="h4" fontWeight="bold" paddingBottom="20px">
            {nberTestCreated}
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
          </Box>
          <Typography variant="h4" fontWeight="bold" paddingBottom="20px">
            {nberTestBaught}
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
