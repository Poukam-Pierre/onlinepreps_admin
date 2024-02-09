// Made by Poukam Ngamaleu

import { Box, Paper, Typography } from '@mui/material'
import emptyImg from '../../../asset/empty.svg'
import { useEffect, useState } from 'react'
import Axios from 'axios'

function Finances() {
  const [amount, setAmount] = useState<number>(0)
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_URL_REMOTE_LINK}/admin/getProvidedAmount`)
      .then((res) => {
        if (res?.status === 200) {
          setAmount(Math.trunc(res.data))
        }
      })
      .catch((err) => {
        return
      })

  }, [])
  return (
    <Box p={3} display="grid" rowGap="70px">
      <Typography variant="h4" color="#555">
        Finances
      </Typography>
      <Box p={3}>
        <Paper sx={{ padding: '20px', width: '15rem', bgcolor: '#F5F0F0' }}>
          <Box
            display="flex"
            justifyContent="space-between"
            paddingBottom="20px"
          >
            <Typography variant="h5" color="#555">
              Montant à pouvoir
            </Typography>
          </Box>
          <Typography variant="h5" fontWeight="bold" textAlign='center'>
            {amount}
          </Typography>
        </Paper>

      </Box>
      {/* <Box display="grid" justifyContent="center">
        <img
          src={emptyImg}
          alt="Page indisponible"
          style={{ width: '35rem', height: '35rem' }}
        />
        <Typography variant="caption" textAlign="center">
          Page non disponible
        </Typography>
      </Box> */}
    </Box>
  )
}

export default Finances
