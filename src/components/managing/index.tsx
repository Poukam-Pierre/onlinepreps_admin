// Made by Poukam Ngamaleu

import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Slide,
  SlideProps,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { theme } from '../../utils/style/theme'
import Axios from 'axios'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from 'dayjs'
import { alertMsgInterface } from '../employe/createEmploy'

type TransitionProps = Omit<SlideProps, 'direction'>

function Manager() {
  const [open, setOpen] = useState<boolean>(false)
  const [rate, setRate] = useState<number>()
  const [commission, setcommission] = useState<number>(0)
  const [sessionDate, setSessionDate] = useState<Dayjs>()
  const [openS, setOpenS] = useState<boolean>(false)
  const [createdMsg, setCreatedMsg] = useState<alertMsgInterface>()

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_URL_REMOTE_LINK}/admin/getCommission`)
      .then((res) => {
        if (res?.status === 200 && res.data) {
          setcommission(res.data)
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          return
        }
      })
  }, [open])

  const handleRate = () => {
    setOpen(false)
    Axios.post(
      `${process.env.REACT_APP_URL_REMOTE_LINK}/admin/changeCommission`,
      { comission: rate }
    )
      .then((res) => {
        if (res.status === 200) {
          return
        }
      })
      .catch((err) => {
        if (err.response.status === 400) return
      })
  }
  const handleSession = () => {
    Axios.post(
      `${process.env.REACT_APP_URL_REMOTE_LINK}/admin/addSessionExam`,
      {
        session: sessionDate,
      }
    )
      .then((res) => {
        if (res.status === 200) {
          setCreatedMsg({
            message: res.data.message,
            severity: 'success',
          })
          setOpenS(true)
        }
      })
      .catch((err) => {
        if (err.response.status === 409) {
          setCreatedMsg({
            message: err.response.data.message,
            severity: 'error',
          })
          setOpenS(true)
        } else {
          setCreatedMsg({
            message: err.response.data.message,
            severity: 'error',
          })
          setOpenS(true)
        }
      })
  }

  function TransitionUp(props: TransitionProps) {
    return <Slide {...props} direction="up" />
  }
  return (
    <Box p={3} display="grid" rowGap="70px">
      <Typography variant="h4" color="#555">
        Manager
      </Typography>
      <Box display="flex" justifyContent="space-around">
        <Paper sx={{ padding: '20px', width: '15rem', bgcolor: '#F5F0F0' }}>
          <Box
            display="flex"
            justifyContent="space-between"
            paddingBottom="20px"
            alignItems="baseline"
          >
            <Typography variant="h5" color="#555">
              Taux de gain
            </Typography>
            <Box
              component={Link}
              to=""
              color={theme.palette.primary.main}
              sx={{
                '& :hover': { color: theme.palette.secondary.main },
                textDecoration: 'none',
              }}
              onClick={() => setOpen(true)}
            >
              <Typography>Modifier</Typography>
            </Box>
          </Box>
          <Typography variant="h4" fontWeight="bold" textAlign="center">
            {commission} %
          </Typography>
        </Paper>
        <Paper
          sx={{
            padding: '20px',
            width: '15rem',
            bgcolor: '#F5F0F0',
            display: 'grid',
            gridGap: '10px',
          }}
        >
          <Typography variant="h5" color="#555">
            Session d'examen
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Session"
              value={sessionDate}
              onChange={(newValue) => {
                setSessionDate(newValue as Dayjs)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Box display="flex" justifyContent="space-between">
            <Box
              component={Link}
              to=""
              color={theme.palette.primary.main}
              sx={{
                '& :hover': { color: theme.palette.secondary.main },
                textDecoration: 'none',
              }}
            >
              <Typography>Lister</Typography>
            </Box>
            <Box
              component={Link}
              to=""
              color={theme.palette.primary.main}
              sx={{
                '& :hover': { color: theme.palette.secondary.main },
                textDecoration: 'none',
              }}
              onClick={handleSession}
            >
              <Typography>Ajouter</Typography>
            </Box>
          </Box>
        </Paper>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Taux de gain</DialogTitle>
          <DialogContent>
            <TextField
              variant="standard"
              type="number"
              autoFocus
              label="Taux de gain"
              onChange={(e) => setRate(Number(e.target.value))}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleRate}>Valider</Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Snackbar
        open={openS}
        onClose={() => setOpenS(false)}
        TransitionComponent={TransitionUp}
        autoHideDuration={6000}
      >
        <Alert
          onClose={() => setOpenS(false)}
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

export default Manager
