//  Made by Poukam Ngamaleu

import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import PartnerTable from './partnerTable'

function Partner() {
  return (
    <Box p={3} display="grid" rowGap="70px">
      <Typography variant="h4" color="#555">
        Partenaires
      </Typography>
      <Box height={600} display="flex" justifyContent="center">
        <PartnerTable />
      </Box>
    </Box>
  )
}

export default Partner
