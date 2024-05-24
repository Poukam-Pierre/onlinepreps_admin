// Made by Poukam Ngamaleu

import {
  Alert,
  Box,
  Button,
  Divider,
  Paper,
  Slide,
  SlideProps,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import { theme } from '../../utils/style/theme'
import { ChangePasswordSchema } from './changePasswordSchema'
import Axios from 'axios'
import { useAuth } from '../../utils/context'
import { useState } from 'react'
import { alertMsgInterface } from '../employe/createEmploy'

type TransitionProps = Omit<SlideProps, 'direction'>

function Settings() {
  const {
    userData: {
      userInfo: { id },
      accessToken,
    },
  } = useAuth()
  const authAxios = Axios.create({
    baseURL: `${process.env.REACT_APP_URL_REMOTE_LINK}/common`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const { values, handleSubmit, handleChange, errors, touched, resetForm } =
    useFormik({
      initialValues: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      onSubmit: (values) => {
        // TODO change local link to remote link
        authAxios
          .put(`/resetPassword/${id}`, values)
          .then((res) => {
            if (res?.status === 200) {
              setCreatedMsg({
                message: res.data.message,
                severity: 'success',
              })
              resetForm()
              setOpen(true)
            }
          })
          .catch((err) => {
            if (err.response.status === 400) {
              setCreatedMsg({
                message: err.response.data.message,
                severity: 'warning',
              })
              setOpen(true)
            } else {
              setCreatedMsg({
                message: err.response.data.message,
                severity: 'error',
              })
              setOpen(true)
            }
          })
      },
      validationSchema: ChangePasswordSchema,
    })

  const [open, setOpen] = useState<boolean>(false)
  const [createdMsg, setCreatedMsg] = useState<alertMsgInterface>()

  function TransitionUp(props: TransitionProps) {
    return <Slide {...props} direction="up" />
  }
  return (
    <Box p={3} display="grid" rowGap="70px">
      <Typography variant="h4" color="#555">
        Paramètres
      </Typography>
      <Box display="flex" justifyContent="center">
        <Paper
          sx={{
            padding: 2,
            backgroundColor: '#F5F0F0',
            width: '60rem',
          }}
          elevation={3}
        >
          <Typography fontWeight="bold" color="#555">
            Changer de mot de passe
          </Typography>
          <Divider />
          <Box
            sx={{
              display: { xs: 'grid', sm: 'flex' },
              alignItems: 'center',
              justifyContent: 'space-around',
              gap: { xs: 3, sm: 'initial' },
            }}
            p={2}
            onSubmit={handleSubmit}
            component="form"
          >
            <Box sx={{ display: 'grid', gap: '15px' }}>
              <TextField
                name="oldPassword"
                label="Ancien mot de passe"
                type="password"
                autoComplete="current-password"
                sx={{ width: { xs: 250, sm: 300 } }}
                value={values.oldPassword}
                onChange={handleChange}
                {...(errors.oldPassword && touched.oldPassword
                  ? { error: true, helperText: errors.oldPassword }
                  : '')}
              />
              <TextField
                name="newPassword"
                label="Nouveau mot de passe"
                type="password"
                autoComplete="new-password"
                sx={{ width: { xs: 250, sm: 300 } }}
                value={values.newPassword}
                onChange={handleChange}
                {...(errors.newPassword && touched.newPassword
                  ? { error: true, helperText: errors.newPassword }
                  : '')}
              />
              <TextField
                name="confirmPassword"
                label="Reécrire nouveau mot de passe"
                type="password"
                autoComplete="retyping-new-password"
                sx={{ width: { xs: 250, sm: 300 } }}
                value={values.confirmPassword}
                onChange={handleChange}
                {...(errors.confirmPassword && touched.confirmPassword
                  ? { error: true, helperText: errors.confirmPassword }
                  : '')}
              />
            </Box>
            <Button
              variant="outlined"
              type="submit"
              sx={{ borderColor: theme.palette.secondary.main }}
            >
              <Typography variant="button" color="black">
                ENREGISTRER
              </Typography>
            </Button>
          </Box>
        </Paper>
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

export default Settings
