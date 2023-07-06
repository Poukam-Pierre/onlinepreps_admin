// Make by Poukam Ngamaleu

import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Paper,
  Slide,
  SlideProps,
  Snackbar,
  styled,
  TextField,
  Typography,
} from '@mui/material'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { alertMsgInterface } from '../createEmploy'
import { employeDataInterface } from '../viewEmploye'
import { useAuth } from '../../../utils/context'

type TransitionProps = Omit<SlideProps, 'direction'>

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
  '&.PhoneInput': {
    width: '45%',
  },
})

const Pays: string[] = ['CMR', 'GBA']

function ModifyEmploye() {
  const { accessToken } = useAuth()
  const { employeId } = useParams()
  const [employeData, setEmployeData] = useState<employeDataInterface>()
  const [createdMsg, setCreatedMsg] = useState<alertMsgInterface>()
  const [open, setOpen] = useState<boolean>(false)

  const authAxios = Axios.create({
    baseURL: `${process.env.REACT_APP_URL_REMOTE_LINK}/admin`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  useEffect(() => {
    // TODO fetch data from BDD
    Axios.get(
      `${process.env.REACT_APP_URL_REMOTE_LINK}/admin/getEmployeInfo/${employeId}`
    )
      .then((res) => {
        if (res?.status === 200 && res.data) {
          setEmployeData(res.data)
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setCreatedMsg({
            message: err.response.data.message,
            severity: 'error',
          })
          setOpen(true)
        } else {
          setCreatedMsg({
            message: 'Rééssayez plutard',
            severity: 'error',
          })
          setOpen(true)
        }
      })
  }, [])

  const { values, handleSubmit, handleChange, resetForm, setFieldValue } =
    useFormik({
      initialValues: {
        name: employeData?.nom,
        email: employeData?.email,
        phoneNumber: employeData?.phone,
        adresse: employeData?.adresse,
        poste: employeData?.poste,
        country: 'CMR',
        password: '',
        imagePreviewUrl:
          'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg',
        file: '',
      },
      onSubmit: ({
        name,
        email,
        phoneNumber,
        adresse,
        poste,
        country,
        password,
        file,
      }) => {
        const body = new FormData()
        body.append('file', file)
        body.append('nom', name as string)
        body.append('email', email as string)
        body.append('phone', phoneNumber as string)
        body.append('adresse', adresse as string)
        body.append('poste', poste as string)
        body.append('country', country)
        body.append('password', password)

        authAxios
          .put(`/updateEmployeInfo/${employeId}`, body)
          .then((res) => {
            if (res?.status === 201) {
              setCreatedMsg({
                message: res.data.message,
                severity: 'success',
              })
              setOpen(true)
              resetForm()
            }
          })
          .catch((err) => {
            if (err) {
              setCreatedMsg({
                message: 'Erreur serveur. Rééssayez plutard',
                severity: 'error',
              })
              setOpen(true)
            }
          })
      },
      enableReinitialize: true,
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
        Modifier données employé
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
            src={
              employeData?.profil_img
                ? employeData.profil_img
                : values.imagePreviewUrl
            }
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
            name="email"
            variant="filled"
            sx={{ width: '45%' }}
            type="email"
            value={values.email}
            onChange={handleChange}
          />
          <TextField
            name="name"
            type="text"
            variant="filled"
            value={values.name}
            onChange={handleChange}
            sx={{ width: '45%' }}
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
            }}
          />
          <TextField
            label="Mot de passe"
            type="password"
            name="password"
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange}
            sx={{ width: '45%' }}
          />
          <TextField
            name="adresse"
            label={values.adresse ? '' : 'Adresse'}
            variant="filled"
            sx={{ width: '45%' }}
            value={values.adresse}
            onChange={handleChange}
          />
          <Autocomplete
            disablePortal
            options={Pays}
            id="country"
            sx={{ width: '45%' }}
            onChange={(event, val) => setFieldValue('pays', val)}
            value={values.country}
            isOptionEqualToValue={(option, value) => option === value}
            renderInput={(params) => <TextField {...params} label="Pays" />}
          />
          <TextField
            name="poste"
            label={values.poste ? '' : 'Poste'}
            variant="filled"
            sx={{ width: '45%' }}
            onChange={handleChange}
            value={values.poste}
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
              Modifier
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

export default ModifyEmploye
