// Made by Poukam Ngamaleu

import {
  Alert,
  Button,
  Slide,
  SlideProps,
  Snackbar,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { useNavigate } from "react-router-dom"
import { alertMsgInterface } from './createEmploy'
import EmployeTable from './employeTable'
import { useState } from 'react'

type TransitionProps = Omit<SlideProps, 'direction'>

function Employes() {
  const navigate = useNavigate()
  const [createdMsg, setCreatedMsg] = useState<alertMsgInterface>()

  function createEmploye() {
    navigate('/admin/employe/new')
  }

  const [open, setOpen] = useState(false)

  function TransitionUp(props: TransitionProps) {
    return <Slide {...props} direction="up" />
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
        <EmployeTable
          setCreatedMsg={setCreatedMsg}
          createdMsg={createdMsg}
          setOpen={setOpen}
        />
      </Box>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={TransitionUp}
        autoHideDuration={6000}
      >
        <Alert
          onClose={() => setOpen(false)}
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

export default Employes
