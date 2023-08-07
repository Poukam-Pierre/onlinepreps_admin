// Made by Poukam Ngamaleu

import { useState, useEffect } from 'react'
import {
  Alert,
  Paper,
  Slide,
  SlideProps,
  Snackbar,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { theme } from '../../../utils/style/theme'
import TotalTestSheet from './ep_total'
import ProductionSheetTable from './ep_production'
import UnvalidedSheetTable from './ep_non_valide'
import StoppedSheetTable from './ep_arrêt'
import Axios from 'axios'
import { alertMsgInterface } from '../../employe/createEmploy'

interface EpreuveDataInterface {
  totalEpreuve: number
  productionEpreuve: number
  unValideEpreuve: number
  stoppedEpreuve: number
}
type TransitionProps = Omit<SlideProps, 'direction'>

function StatEpreuve() {
  const [afficher, setAfficher] = useState<string>('total')
  const [epreuveData, setEpreuveData] = useState<EpreuveDataInterface>()
  const [open, setOpen] = useState(false)
  const [createdMsg, setCreatedMsg] = useState<alertMsgInterface>()

  useEffect(() => {
    // TODO change local link into remote link
    Axios.get(
      `${process.env.REACT_APP_URL_REMOTE_LINK}/admin/getStatisticEpreuve`
    )
      .then((res) => {
        if (res?.status === 200 && res.data) {
          setEpreuveData(res.data)
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setCreatedMsg({
            message: 'Erreur serveur, rééssayez plutard',
            severity: 'error',
          })
          setOpen(true)
        }
      })
  }, [])

  function TransitionUp(props: TransitionProps) {
    return <Slide {...props} direction="up" />
  }
  return (
    <Box p={2}>
      <Typography variant="h4" color="#555">
        Epreuves
      </Typography>
      <Box display="flex" justifyContent="space-around" padding="25px 0 0 0">
        <Paper sx={{ padding: '20px', width: '15rem', bgcolor: '#F5F0F0' }}>
          <Typography variant="h5" color="#555" paddingBottom="20px">
            Total
          </Typography>
          <Typography variant="h4" fontWeight="bold" paddingBottom="20px">
            {epreuveData?.totalEpreuve}
          </Typography>
          <Box
            color={theme.palette.primary.main}
            sx={{
              '& :hover': {
                color: theme.palette.secondary.main,
                cursor: 'pointer',
              },
            }}
            onClick={() => setAfficher('total')}
          >
            <Typography>Lister</Typography>
          </Box>
        </Paper>
        <Paper sx={{ padding: '20px', width: '15rem', bgcolor: '#F5F0F0' }}>
          <Box
            display="flex"
            justifyContent="space-between"
            paddingBottom="20px"
          >
            <Typography variant="h5" color="#555">
              En production
            </Typography>
          </Box>
          <Typography variant="h4" fontWeight="bold" paddingBottom="20px">
            {epreuveData?.productionEpreuve}
          </Typography>
          <Box
            color={theme.palette.primary.main}
            sx={{
              '& :hover': {
                color: theme.palette.secondary.main,
                cursor: 'pointer',
              },
            }}
            onClick={() => setAfficher('production')}
          >
            <Typography>Lister</Typography>
          </Box>
        </Paper>
        <Paper sx={{ padding: '20px', width: '15rem', bgcolor: '#F5F0F0' }}>
          <Box
            display="flex"
            justifyContent="space-between"
            paddingBottom="20px"
          >
            <Typography variant="h5" color="#555">
              Non validé
            </Typography>
          </Box>
          <Typography variant="h4" fontWeight="bold" paddingBottom="20px">
            {epreuveData?.unValideEpreuve}
          </Typography>
          <Box
            color={theme.palette.primary.main}
            sx={{
              '& :hover': {
                color: theme.palette.secondary.main,
                cursor: 'pointer',
              },
            }}
            onClick={() => setAfficher('unvalided')}
          >
            <Typography>Lister</Typography>
          </Box>
        </Paper>
        <Paper sx={{ padding: '20px', width: '15rem', bgcolor: '#F5F0F0' }}>
          <Box
            display="flex"
            justifyContent="space-between"
            paddingBottom="20px"
          >
            <Typography variant="h5" color="#555">
              En arrêt
            </Typography>
          </Box>
          <Typography variant="h4" fontWeight="bold" paddingBottom="20px">
            {epreuveData?.stoppedEpreuve}
          </Typography>
          <Box
            color={theme.palette.primary.main}
            sx={{
              '& :hover': {
                color: theme.palette.secondary.main,
                cursor: 'pointer',
              },
            }}
            onClick={() => setAfficher('stopped')}
          >
            <Typography>Lister</Typography>
          </Box>
        </Paper>
      </Box>
      <Box
        height={600}
        display="flex"
        justifyContent="center"
        paddingTop="20px"
      >
        {afficher === 'total' ? (
          <TotalTestSheet setMsg={setCreatedMsg} setOpen={setOpen} />
        ) : afficher === 'production' ? (
          <ProductionSheetTable setMsg={setCreatedMsg} setOpen={setOpen} />
        ) : afficher === 'unvalided' ? (
          <UnvalidedSheetTable setMsg={setCreatedMsg} setOpen={setOpen} />
        ) : (
          <StoppedSheetTable setMsg={setCreatedMsg} setOpen={setOpen} />
        )}
      </Box>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={TransitionUp}
        autoHideDuration={6000}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={createdMsg?.severity}
          sx={{ width: '100%' }}
          variant="filled"
        >
          {createdMsg?.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default StatEpreuve
