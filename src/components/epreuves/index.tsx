//  Made by Poukam Ngamaleu

import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import TestSheetTable from './testSheetTable'
import uuid from 'react-uuid'
import { useNavigate } from "react-router-dom"
import { useAuth } from '../../utils/context'

function TestSheet() {
  const navigate = useNavigate()
  const {

    userData: {
      userInfo: { id, poste }
    }
  } = useAuth()
  function createFormSheet() {
    const id_ = uuid()
    navigate('/form/' + id_)
  }
  return (
    <Box p={3} display="grid" rowGap="70px">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" color="#555">
          Epreuves ( {poste?.split('|')[1]} | CMR)
        </Typography>
        <Button
          variant="outlined"
          sx={{
            borderColor: '#369DC1',
            color: '#369DC1',
          }}
          onClick={createFormSheet}
        >
          Créer épreuve
        </Button>
      </Box>
      <Box
        height={600}
        display="flex"
        justifyContent="center"
        position="relative"
      >
        <TestSheetTable id_={id as number} />
      </Box>
    </Box>
  )
}

export default TestSheet
