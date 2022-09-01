//  Made by Poukam Ngamaleu

import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import SelleSheetTable from './sheetSelle'

function TestSheetBuying() {
  return (
    <Box p={3} display="grid" rowGap="70px">
      <Typography variant="h4" color="#555">
        Achat épreuves
      </Typography>
      <Box height={600} display="flex" justifyContent="center">
        <SelleSheetTable />
      </Box>
    </Box>
  )
}

export default TestSheetBuying
