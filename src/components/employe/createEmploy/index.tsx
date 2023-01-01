// Make by Poukam Ngamaleu

import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'
import {
  Alert,
  AlertColor,
  Autocomplete,
  Box,
  Button,
  FormHelperText,
  Paper,
  Slide,
  SlideProps,
  Snackbar,
  styled,
  TextField,
  Typography,
} from '@mui/material'
import Axios from 'axios'
import { useFormik } from 'formik'
import { useState } from 'react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { CreateEmployeSchema } from './create_empl-schem'

type TransitionProps = Omit<SlideProps, 'direction'>

export interface alertMsgInterface {
  message: string
  severity: AlertColor | undefined
}

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
  const [open, setOpen] = useState<boolean>(false)
  const [createdMsg, setCreatedMsg] = useState<alertMsgInterface>()
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
      nom: '',
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
    onSubmit: ({
      nom,
      phoneNumber,
      file,
      poste,
      adresse,
      password,
      country,
      email,
    }) => {
      // TODO update this part
      const body = new FormData()
      body.append('file', file)
      body.append('nom', nom)
      body.append('email', email)
      body.append('phoneNumber', phoneNumber)
      body.append('adresse', adresse)
      body.append('poste', poste)
      body.append('country', country)
      body.append('password', password)
      Axios.post(
        `${process.env.REACT_APP_URL_REMOTE_LINK}/signup/employe`,
        body
      )
        .then((res) => {
          if (res?.status === 201) {
            setCreatedMsg({
              message: 'Enregistrement réussi.',
              severity: 'success',
            })
            setOpen(true)
          }
        })
        .catch(
          (err: { response: { status: number; data: { message: any } } }) => {
            if (err.response.status === 409) {
              setCreatedMsg({
                message: err.response.data.message,
                severity: 'error',
              })
              setOpen(true)
            } else {
              setCreatedMsg({
                message: 'Erreur serveur. Rééssayez plutard.',
                severity: 'error',
              })
              setOpen(true)
            }
          }
        )

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

  function TransitionUp(props: TransitionProps) {
    return <Slide {...props} direction="up" />
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
            name="nom"
            type="text"
            label="Nom complet"
            variant="filled"
            value={values.nom}
            onChange={handleChange}
            sx={{ width: '45%' }}
            {...(errors.nom && touched.nom
              ? { error: true, helperText: errors.nom }
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

export default CreationEmploye
