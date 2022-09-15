//  Made by Poukam Ngamaleu

import {
  Avatar,
  Button,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import PersonIcon from '@mui/icons-material/Person'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'
import MailIcon from '@mui/icons-material/Mail'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import PublishIcon from '@mui/icons-material/Publish'
import { useFormik } from 'formik'
import 'react-phone-number-input/style.css'
import { StylePhoneNumber } from '../employe/createEmploy'

function EmployeProfil() {
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
      userName: '',
      name: '',
      email: '',
      phoneNumber: '',
      adresse: '',
      imagePreviewUrl:
        'https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true',
      file: '',
    },
    onSubmit: (values) => {
      console.log(values)
      // Ici entre l'appelle API REST
      resetForm()
    },
    //   validationSchema: ChangePasswordSchema,
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
              src="https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true"
              sx={{ width: '5rem', height: '5rem' }}
            />
            <Box paddingLeft="30px">
              <Typography variant="h5" paddingBottom="10px" fontWeight="bold">
                Poukam Fimeni
              </Typography>
              <Typography paddingTop="10px">Agent Mifi</Typography>
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
                  Poukam Fimeni
                </ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <CalendarMonthIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{ '& .MuiTypography-root': { fontSize: '1.2rem' } }}
                >
                  03 Avril 1996
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
                  +237 696841451
                </ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{ '& .MuiTypography-root': { fontSize: '1.2rem' } }}
                >
                  fimeni96@gmail.com
                </ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <MyLocationIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{ '& .MuiTypography-root': { fontSize: '1.2rem' } }}
                >
                  Bangangté | CMR
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
                name="userName"
                type="text"
                label="Nom d'utilisateur"
                variant="filled"
                value={values.userName}
                onChange={handleChange}
                sx={{ width: '90%' }}
              />
              <TextField
                name="name"
                type="text"
                label="Nom"
                variant="filled"
                value={values.name}
                onChange={handleChange}
                sx={{ width: '90%' }}
              />
              <TextField
                name="email"
                type="email"
                label="Email"
                variant="filled"
                value={values.email}
                onChange={handleChange}
                sx={{ width: '90%' }}
              />
              <StylePhoneNumber
                value={values.phoneNumber}
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
              />
              <TextField
                name="adresse"
                label="Adresse"
                variant="filled"
                value={values.adresse}
                onChange={handleChange}
                sx={{ width: '90%' }}
              />
            </Box>
            <Box display="flex" flexDirection="column" gap="8rem">
              <Box display="flex" alignItems="center">
                <img
                  src={values.imagePreviewUrl}
                  alt=""
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
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}

export default EmployeProfil
