// Made by Poukam Ngamaleu

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { theme } from '../../utils/style/theme'
import Axios from 'axios'

function Manager() {
  const [open, setOpen] = useState<boolean>(false)
  const [rate, setRate] = useState<number>()
  const [commission, setcommission] = useState<number>(0)

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

  return (
    <Box p={3} display="grid" rowGap="70px">
      <Typography variant="h4" color="#555">
        Manager
      </Typography>
      <Box display="flex">
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
    </Box>
  )
}

export default Manager
