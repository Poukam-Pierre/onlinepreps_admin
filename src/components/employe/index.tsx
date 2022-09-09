// Made by Poukam Ngamaleu

import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import EmployeTable from './employeTable'

function Employes() {
  const navigate = useNavigate()

  function createEmploye() {
    navigate('/admin/employe/new')
  }

  return (
    <Box p={3} display="grid" rowGap="70px">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" color="#555">
          Employes
        </Typography>
        <Button
          variant="outlined"
          sx={{
            borderColor: '#369DC1',
            color: '#369DC1',
          }}
          onClick={createEmploye}
        >
          Créer employe
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" height={600}>
        <EmployeTable />
      </Box>
    </Box>
  )
}

export default Employes
