// Made by Poukam Ngamaleu

import { Box, Typography } from '@mui/material'
import emptyImg from '../../../asset/empty.svg'

function Finances() {
  return (
    <Box p={3} display="grid" rowGap="70px">
      <Typography variant="h4" color="#555">
        Finances
      </Typography>
      <Box display="grid" justifyContent="center">
        <img
          src={emptyImg}
          alt="Page indisponible"
          style={{ width: '35rem', height: '35rem' }}
        />
        <Typography variant="caption" textAlign="center">
          Page non disponible
        </Typography>
      </Box>
    </Box>
  )
}

export default Finances
