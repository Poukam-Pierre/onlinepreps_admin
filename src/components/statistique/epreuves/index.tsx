// Made by Poukam Ngamaleu

import { useState } from 'react'
import { Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { theme } from '../../../utils/style/theme'
import TotalTestSheet from './ep_total'
import ProductionSheetTable from './ep_production'
import UnvalidedSheetTable from './ep_non_valide'
import StoppedSheetTable from './ep_arrêt'

function StatEpreuve() {
  const [afficher, setAfficher] = useState<string>('total')
  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-around">
        <Paper sx={{ padding: '20px', width: '15rem', bgcolor: '#F5F0F0' }}>
          <Typography variant="h5" color="#555" paddingBottom="20px">
            Total
          </Typography>
          <Typography variant="h4" fontWeight="bold" paddingBottom="20px">
            1000
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
            900
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
            30
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
            70
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
          <TotalTestSheet />
        ) : afficher === 'production' ? (
          <ProductionSheetTable />
        ) : afficher === 'unvalided' ? (
          <UnvalidedSheetTable />
        ) : (
          <StoppedSheetTable />
        )}
      </Box>
    </Box>
  )
}

export default StatEpreuve
