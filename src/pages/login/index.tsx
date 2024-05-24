// Made by Poukam Ngamaleu

import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Alert,
  Box,
  Fab,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Slide,
  SlideProps,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'
import Axios from 'axios'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import logo from '../../asset/logo.PNG'
import { alertMsgInterface } from '../../components/employe/createEmploy'
import { authInterface, useAuth } from '../../utils/context'
import { theme } from '../../utils/style/theme'
import { LoginSchema } from './loginSchema'
import CircularProgress from '@mui/material/CircularProgress'

interface SignInformations {
  email: string
  password: string
}

type TransitionProps = Omit<SlideProps, 'direction'>

function SignIn() {
  const navigate = useNavigate()
  const { authDispatch } = useAuth()
  const [value, setValue] = useState<boolean>(false)
  const [createdMsg, setCreatedMsg] = useState<alertMsgInterface>()
  const [loading, setLoading] = useState<Boolean>(false)
  const { values, handleChange, handleSubmit, errors, touched, resetForm } =
    useFormik<SignInformations>({
      initialValues: {
        email: '',
        password: '',
      },
      onSubmit: (values) => {
        setLoading(true)
        Axios.post(
          `${process.env.REACT_APP_URL_REMOTE_LINK}/auth/login/admin`,
          {
            email: values.email,
            password: values.password,
          }
        )
          .then((res) => {
            if (res?.status === 200 && res.data) {
              const data: authInterface = res.data as authInterface
              authDispatch(data)
              navigate('/')
            }
          })
          .catch((err) => {
            if (err?.response.status === 401) {
              setCreatedMsg({
                message: err.response.data.message,
                severity: 'warning',
              })
              setOpen(true)
              setLoading(false)
              resetForm()
            } else if (err?.response.status === 400) {
              setCreatedMsg({
                message: err.response.data.message,
                severity: 'error',
              })
              setOpen(true)
              setLoading(false)
            } else {
              setCreatedMsg({
                message: 'Erreur serveur. Rééssayez plutard.',
                severity: 'error',
              })
              setOpen(true)
              setLoading(false)
              resetForm()
            }
          })
      },
      validationSchema: LoginSchema,
    })

  function handleClickShowPassword() {
    setValue(!value)
  }

  const [open, setOpen] = useState(false)

  function TransitionUp(props: TransitionProps) {
    return <Slide {...props} direction="up" />
  }
  return (
    <Box
      sx={{
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Paper
        sx={{
          width: '30em',
          borderRadius: '25px',
          backgroundColor: theme.palette.primary.light,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          padding: 2,
          color: theme.common.greeting,
        }}
        elevation={3}
      >
        <Box
          component="img"
          src={logo}
          alt="OnlinePreps"
          sx={{ maxWidth: 125 }}
        />
        <Typography variant="h6">BON RETOUR PARMI NOUS</Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          autoComplete="off"
          textAlign="center"
        >
          <Box sx={{ display: 'grid', gap: '10px', width: '25rem' }}>
            <TextField
              label="Email"
              type="text"
              name="email"
              variant="outlined"
              value={values.email}
              onChange={handleChange}
              sx={{
                '& input': { color: theme.palette.secondary.contrastText },
              }}
              {...(errors.email && touched.email
                ? { error: true, helperText: errors.email }
                : '')}
            />
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Mot de passe
              </InputLabel>
              <OutlinedInput
                name="password"
                type={value ? 'text' : 'password'}
                onChange={handleChange}
                value={values.password}
                sx={{
                  '& input': { color: theme.palette.secondary.contrastText },
                }}
                {...(errors.password && touched.password
                  ? { error: true }
                  : '')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {value ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {errors.password && touched.password ? (
                <FormHelperText error>{errors.password}</FormHelperText>
              ) : (
                ''
              )}
            </FormControl>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            margin="15px 0 25px 0"
            sx={{ position: 'relative' }}
          >
            <Fab
              variant="extended"
              aria-label="add"
              type="submit"
              sx={{ bgcolor: theme.palette.primary.main }}
              disabled={loading ? true : false}
            >
              <Typography variant="button" paddingLeft="5px">
                CONNEXION
              </Typography>
            </Fab>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                  color: 'yellow',
                }}
              />
            )}
          </Box>
        </Box>
      </Paper>
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

export default SignIn
