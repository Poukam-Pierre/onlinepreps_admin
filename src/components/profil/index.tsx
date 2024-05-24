//  Made by Poukam Ngamaleu

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import MailIcon from '@mui/icons-material/Mail'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import PersonIcon from '@mui/icons-material/Person'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'
import PublishIcon from '@mui/icons-material/Publish'
import {
  Alert,
  Avatar,
  Button,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Slide,
  SlideProps,
  Snackbar,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material'
import { Box } from '@mui/system'
import Axios from 'axios'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import 'react-phone-number-input/style.css'
import { useAuth } from '../../utils/context'
import { alertMsgInterface, StylePhoneNumber } from '../employe/createEmploy'
import { LoginSchema } from './schemaProfil'

type TransitionProps = Omit<SlideProps, 'direction'>

function EmployeProfil() {
  const {
    userData: {
      userInfo: {
        id,
        nom,
        email,
        phoneNumber,
        adresse,
        profil_img,
        poste,
        prenom,
        birthDate,

      },
      accessToken,
      userInfo,
    },
    authDispatch,
  } = useAuth()

  const authAxios = Axios.create({
    baseURL: `${process.env.REACT_APP_URL_REMOTE_LINK}/employe`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const {
    values,
    handleSubmit,
    handleChange,
    errors,
    touched,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: nom,
      email: email,
      phoneNumber: phoneNumber,
      adresse: adresse,
      imagePreviewUrl: profil_img
        ? profil_img
        : 'https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true',
      file: '',
    },
    onSubmit: ({ name, email, phoneNumber, file, adresse }) => {
      setLoading(true)
      const body = new FormData()
      body.append('file', file)
      body.append('nom', name)
      body.append('email', email)
      body.append('phoneNumber', phoneNumber as string)
      body.append('adresse', adresse as string)

      authAxios
        .put(`/updateInfos/${id}`, body)
        .then((res) => {
          if (res?.status === 200) {
            authDispatch({
              accessToken: accessToken,
              userInfo: {
                ...userInfo,
                nom: res.data.nom,
                email: res.data.email,
                adresse: res.data.adresse,
                profil_img: res.data.profil_img
                  ? res.data.profil_img
                  : profil_img,
              },
            })
            setCreatedMsg({
              message: 'Modification éffectué avec succès',
              severity: 'success',
            })
            setOpen(true)
            setLoading(false)
          }
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setCreatedMsg({
              message: err.response.data.message,
              severity: 'error',
            })
            setOpen(true)
            setLoading(false)
          } else if (err.response.status === 401) {
            setCreatedMsg({
              message: err.response.data.message,
              severity: 'warning',
            })
            setOpen(true)
            resetForm()
            setLoading(false)
          } else {
            setCreatedMsg({
              message: 'Erreur serveur. Rééssayez plutard.',
              severity: 'error',
            })
            setOpen(true)
            setLoading(false)
          }
        })
    },
    enableReinitialize: true,
    validationSchema: LoginSchema,
  })

  function photoUpload(e: any) {
    // e.preventDefauld()
    const reader = new FileReader()
    const file = e.target.files[0]
    reader.onloadend = () => {
      setFieldValue('file', file)
      setFieldValue('imagePreviewUrl', reader.result)
    }
    reader.readAsDataURL(file)
  }

  const [createdMsg, setCreatedMsg] = useState<alertMsgInterface>()

  function TransitionUp(props: TransitionProps) {
    return <Slide {...props} direction="up" />
  }
  return (
    <Box p={3} display="grid" rowGap="70px">
      <Typography variant="h4" color="#555">
        Modifier informations
      </Typography>
      <Box display="flex" gap="20px">
        <Paper
          sx={{
            flex: 1,
            padding: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            bgcolor: '#F5F0F0',
          }}
        >
          <Box display="flex" alignItems="center">
            <Avatar
              src={
                profil_img
                  ? profil_img
                  : 'https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true'
              }
              sx={{ width: '5rem', height: '5rem' }}
            />
            <Box paddingLeft="30px">
              <Typography variant="h5" paddingBottom="10px" fontWeight="bold">
                {nom} {prenom}
              </Typography>
              <Typography paddingTop="10px">{poste}</Typography>
            </Box>
          </Box>
          <Box>
            <Typography color="#555">Détails de compte</Typography>
            <MenuList>
              <MenuItem>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{ '& .MuiTypography-root': { fontSize: '1.2rem' } }}
                >
                  {nom} {prenom}
                </ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <CalendarMonthIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{ '& .MuiTypography-root': { fontSize: '1.2rem' } }}
                >
                  {birthDate}
                </ListItemText>
              </MenuItem>
            </MenuList>
          </Box>
          <Box>
            <Typography color="#555">Contacts</Typography>
            <MenuList>
              <MenuItem>
                <ListItemIcon>
                  <PhoneAndroidIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{ '& .MuiTypography-root': { fontSize: '1.2rem' } }}
                >
                  {phoneNumber}
                </ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{ '& .MuiTypography-root': { fontSize: '1.2rem' } }}
                >
                  {email}
                </ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <MyLocationIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{ '& .MuiTypography-root': { fontSize: '1.2rem' } }}
                >
                  {adresse}
                </ListItemText>
              </MenuItem>
            </MenuList>
          </Box>
        </Paper>
        <Paper sx={{ flex: 2, padding: 3, bgcolor: '#F5F0F0' }}>
          <Typography variant="h5" color="#555" padding="0 0 20px 0">
            Modifier
          </Typography>
          <Box
            display="flex"
            justifyContent="space-around"
            component="form"
            onSubmit={handleSubmit}
          >
            <Box display="grid" gap="20px" width="30rem" height="fit-content">
              <TextField
                name="name"
                type="text"
                label="Nom"
                variant="filled"
                value={values.name}
                onChange={handleChange}
                sx={{ width: '90%' }}
                {...(errors.name && touched.name
                  ? { error: true, helperText: errors.name }
                  : '')}
              />
              <TextField
                name="email"
                type="email"
                label="Email"
                variant="filled"
                value={values.email}
                onChange={handleChange}
                sx={{ width: '90%' }}
                {...(errors.email && touched.email
                  ? { error: true, helperText: errors.email }
                  : '')}
              />
              {/* <StylePhoneNumber
                value={values.phoneNumber as string}
                onChange={(number) =>
                  setFieldValue(`phoneNumber`, number?.toString())
                }
                placeholder="Numéro de téléphone"
                sx={{
                  '& .PhoneInputInput': {
                    height: '85%',
                    backgroundColor: '#DADADA',
                    borderColor: '#000',
                    borderTop: 'none',
                    borderLeft: 'none',
                    borderRight: 'none',
                    borderBottom: 'solid #999999',
                    borderWidth: '1px',
                    overflow: 'hidden',
                    fontSize: '1rem',
                    width: '100%',
                  },
                  '&.PhoneInput': {
                    width: '90%',
                  },
                }}
              /> */}
              <TextField
                name="adresse"
                label="Adresse"
                variant="filled"
                value={values.adresse}
                onChange={handleChange}
                sx={{ width: '90%' }}
                {...(errors.adresse && touched.adresse
                  ? { error: true, helperText: errors.adresse }
                  : '')}
              />
            </Box>
            <Box display="flex" flexDirection="column" gap="8rem">
              <Box display="flex" alignItems="center">
                <img
                  src={values.imagePreviewUrl}
                  alt="profil img"
                  style={{
                    width: '15rem',
                    height: '15rem',
                    borderRadius: '15px',
                  }}
                />
                <label
                  htmlFor="file"
                  style={{ cursor: 'pointer', paddingLeft: '5px' }}
                >
                  <PublishIcon fontSize="large" />
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: 'none' }}
                  onChange={photoUpload}
                />
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                sx={{ position: 'relative' }}
              >
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    width: 'fit-content',
                    alignSelf: 'center',
                    bgcolor: '#369DC1',
                  }}
                >
                  Enregistrer
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                )}
              </Box>
            </Box>
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

export default EmployeProfil
