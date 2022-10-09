// Make by Poukam Ngamaleu

import {
  Autocomplete,
  Box,
  Button,
  FormHelperText,
  Paper,
  styled,
  TextField,
  Typography,
} from '@mui/material'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { useFormik } from 'formik'
import { CreateEmployeSchema } from './create_empl-schem'

export const StylePhoneNumber = styled(PhoneInput)({
  height: '60px',
  '& .PhoneInputCountrySelectArrow': {
    height: '0.5em',
  },

  '& .PhoneInputCountry': {
    display: 'none',
  },
  '& .PhoneInputCountryIcon ': {
    height: '2rem',
    width: 'calc(2rem * 1.5 )',
  },
})

function CreationEmploye() {
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
      poste: '',
      country: 'CMR',
      password: '',
      imagePreviewUrl:
        'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg',
      file: '',
    },
    onSubmit: (values) => {
      console.log(values)
      // Ici entre l'appelle API REST
      resetForm()
    },
    validationSchema: CreateEmployeSchema,
  })

  function photoUpload(e: any) {
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
        Créer nouveau employé
      </Typography>
      <Paper
        sx={{
          padding: 3,
          bgcolor: '#F5F0F0',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <Box flex={1}>
          <img
            src={values.imagePreviewUrl}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
        </Box>
        <Box
          flex={2}
          display="flex"
          flexWrap="wrap"
          gap="15px"
          justifyContent="end"
          component="form"
          onSubmit={handleSubmit}
        >
          <Box width="45%" display="flex" alignItems="center">
            <label
              htmlFor="file"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                cursor: 'pointer',
              }}
            >
              Images: <DriveFolderUploadIcon />
            </label>
            <input
              type="file"
              id="file"
              style={{ display: 'none' }}
              onChange={photoUpload}
            />
          </Box>
          <TextField
            name="userName"
            type="text"
            label="Nom d'utilisateur"
            value={values.userName}
            onChange={handleChange}
            variant="filled"
            sx={{ width: '45%' }}
            {...(errors.userName && touched.userName
              ? { error: true, helperText: errors.userName }
              : '')}
          />
          <TextField
            name="name"
            type="text"
            label="Nom complet"
            variant="filled"
            value={values.name}
            onChange={handleChange}
            sx={{ width: '45%' }}
            {...(errors.name && touched.name
              ? { error: true, helperText: errors.name }
              : '')}
          />
          <TextField
            name="email"
            label="Email"
            variant="filled"
            sx={{ width: '45%' }}
            type="email"
            value={values.email}
            onChange={handleChange}
            {...(errors.email && touched.email
              ? { error: true, helperText: errors.email }
              : '')}
          />
          <Box display="grid" width="45%">
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
                },
              }}
            />
            {errors.phoneNumber && touched.phoneNumber ? (
              <FormHelperText error>{errors.phoneNumber}</FormHelperText>
            ) : (
              ''
            )}
          </Box>
          <TextField
            label="Mot de passe"
            type="password"
            name="password"
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange}
            sx={{ width: '45%' }}
            {...(errors.password && touched.password
              ? { error: true, helperText: errors.password }
              : '')}
          />
          <TextField
            name="adresse"
            label="Adresse"
            variant="filled"
            sx={{ width: '45%' }}
            value={values.adresse}
            onChange={handleChange}
            {...(errors.adresse && touched.adresse
              ? { error: true, helperText: errors.adresse }
              : '')}
          />
          <Autocomplete
            disablePortal
            options={['CMR', 'GBA']}
            id="country"
            sx={{ width: '45%' }}
            onChange={(event, val) => setFieldValue('pays', val)}
            value={values.country}
            isOptionEqualToValue={(option, value) => option === value}
            renderInput={(params) => <TextField {...params} label="Pays" />}
          />
          <TextField
            name="poste"
            label="Poste"
            variant="filled"
            sx={{ width: '45%' }}
            onChange={handleChange}
            value={values.poste}
            {...(errors.poste && touched.poste
              ? { error: true, helperText: errors.poste }
              : '')}
          />
          <Box width="45%" display="flex" justifyContent="center">
            <Button
              variant="contained"
              sx={{
                width: 'fit-content',
                alignSelf: 'center',
                bgcolor: '#369DC1',
              }}
              type="submit"
            >
              Enregistrer
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default CreationEmploye
