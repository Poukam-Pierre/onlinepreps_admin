// Made by poukam Ngamaleu

import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import errorImg from '../../asset/404_not_found.jpg'

function Error() {
  return (
    <Box p={3} display="grid" rowGap="70px">
      <Typography variant="h4" color="#555">
        Erreur de navigation
      </Typography>
      <Box display="grid" justifyContent="center">
        <img
          src={errorImg}
          alt="Page indisponible"
          style={{ width: '35rem', height: '35rem' }}
        />
        <Typography variant="caption" textAlign="center">
          Page inexistant
        </Typography>
      </Box>
    </Box>
  )
}

export default Error
