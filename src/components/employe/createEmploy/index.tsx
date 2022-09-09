// Make by Poukam Ngamaleu

import {
  Autocomplete,
  Box,
  Button,
  Paper,
  styled,
  TextField,
  Typography,
} from '@mui/material'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { useState } from 'react'

export const StylePhoneNumber = styled(PhoneInput)({
  height: '60px',
  '& .PhoneInputCountrySelectArrow': {
    height: '0.5em',
  },
  '& .PhoneInputInput': {
    height: '85%',
    backgroundColor: 'transparent',
    borderColor: '#000',
    borderRadius: '5px',
    borderStyle: 'solid',
    borderWidth: '1px',
    overflow: 'hidden',
    opacity: '0.5',
    fontSize: '1rem',
  },
  '& .PhoneInputCountryIcon ': {
    height: '2rem',
    width: 'calc(2rem * 1.5 )',
  },
})

const Pays: string[] = ['CMR', 'GBA']

function CreationEmploye() {
  const [value, setValue] = useState()
  const [file, setFile] = useState()
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
            src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
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
        >
          <Box width="45%" display="flex" alignItems="center">
            <label
              htmlFor="file"
              style={{ display: 'flex', alignItems: 'center', gap: '15px' }}
            >
              Images: <DriveFolderUploadIcon />
            </label>
            <input type="file" id="file" style={{ display: 'none' }} />
          </Box>
          <TextField
            label="Nom d'utilisateur"
            variant="filled"
            sx={{ width: '45%' }}
          />
          <TextField
            label="Nom complet"
            variant="filled"
            sx={{ width: '45%' }}
          />
          <TextField label="Email" variant="filled" sx={{ width: '45%' }} />
          <StylePhoneNumber
            // value={values.phoneNumber}
            // onChange={(number: string) =>
            //   setFieldValue(`phoneNumber`, number?.toString())
            // }
            onChange={() => setValue}
            placeholder="Numéro de téléphone"
            value={value}
            sx={{ width: '45%' }}
          />
          <TextField
            id="password"
            label="Mot de passe"
            type="password"
            name="password"
            autoComplete="current-password"
            sx={{ width: '45%' }}
          />
          <TextField label="Adresse" variant="filled" sx={{ width: '45%' }} />
          <Autocomplete
            disablePortal
            options={Pays}
            id="pays"
            sx={{ width: '45%' }}
            // onChange={(event, val) => setFieldValue('typeAbonnement', val)}
            // value={values.typeAbonnement}
            isOptionEqualToValue={(option, value) => option === value}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Pays"
                // {...(errors.typeAbonnement && touched.typeAbonnement
                //   ? { error: true, helperText: errors.typeAbonnement }
                //   : '')}
              />
            )}
          />
          <TextField label="Post" variant="filled" sx={{ width: '45%' }} />
          <Box width="45%" display="flex" justifyContent="center">
            <Button
              variant="contained"
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
  )
}

export default CreationEmploye
