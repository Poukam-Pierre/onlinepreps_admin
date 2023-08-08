// Made by Poukam Ngamaleu

import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import SaveIcon from '@mui/icons-material/Save'
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Fab,
  Slide,
  SlideProps,
  Snackbar,
  Typography,
} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import Axios from 'axios'
import { Dayjs } from 'dayjs'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useBeforeunload } from 'react-beforeunload'
import { useNavigate, useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import { useAuth } from '../../utils/context'
import {
  countries,
  dataCategoryOfLicence,
  department,
} from '../../utils/dataWorking'
import { theme } from '../../utils/style/theme'
import { alertMsgInterface } from '../employe/createEmploy'
import { question } from './functionSheet'
import questionsUI from './questionUI'

type TransitionProps = Omit<SlideProps, 'direction'>

function FormSheet() {
  const {
    userInfo: { id, nom, profil_img },
  } = useAuth()
  const navigate = useNavigate()
  const { formId } = useParams()
  const [date, setDate] = useState<Dayjs | null>(null)
  const [feedBack, setFeedBack] = useState<string>('')
  const [success, setSuccess] = useState<string>('default')
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [openS, setOpenS] = useState<boolean>(false)
  const [createdMsg, setCreatedMsg] = useState<alertMsgInterface>()
  const [questions, setQuestions] = useState<question[]>([
    {
      questionBody: 'Question',
      propositionAnswers: [{ proposition: 'Option 1', is_answer: false }],
      open: true,
      answer: false,
    },
  ])
  const languages = [
    { code: 'fr', label: 'Français', country_code: 'fr' },
    { code: 'en', label: 'English', country_code: 'gb' },
  ]

  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      id_: formId,
      session: date,
      category: 'B',
      country: 'Cameroun',
      language: 'fr',
      department: 'Haute-Sanaga',
      questionss: questions,
    },
    onSubmit: ({
      id_,
      session,
      category,
      country,
      language,
      department,
      questionss,
    }) => {
      // TODO fetch data epreuve

      const testInformations = new FormData()

      testInformations.append('epreuveId', id_ as string)
      testInformations.append('session', JSON.stringify(session))
      testInformations.append('category', category)
      testInformations.append('country', country)
      testInformations.append('language', language)
      testInformations.append('department', department)
      // eslint-disable-next-line array-callback-return
      questionss.map(({ questionBody, propositionAnswers, feedback, file }) => {
        testInformations.append(`questionBody`, questionBody)
        testInformations.append(
          `propositionAnswer`,
          JSON.stringify(propositionAnswers)
        )
        testInformations.append('file', file as string)
        testInformations.append(`feedback`, feedback as string)
      })

      setLoading(true)
      Axios.post(
        `${process.env.REACT_APP_URL_REMOTE_LINK}/employe/savingExamInfos/${id}`,
        testInformations
      )
        .then((res) => {
          if (res?.status === 201) {
            setSuccess('success')
            setLoading(false)
            setCreatedMsg({
              message: res.data.message,
              severity: 'success',
            })
            setOpenS(true)
            setTimeout(() => {
              navigate('/epreuves')
            }, 3000)
          }
        })
        .catch((err) => {
          if (err.response.status === 409) {
            setSuccess('echec')
            setLoading(false)
            setCreatedMsg({
              message: err.response.data.message,
              severity: 'info',
            })
            setOpenS(true)
          } else if (err.response.status === 404) {
            setSuccess('echec')
            setLoading(false)
            setCreatedMsg({
              message: err.response.data.message,
              severity: 'error',
            })
            setOpenS(true)
          } else {
            setSuccess('echec')
            setLoading(false)
            setCreatedMsg({
              message: 'Erreur serveur. Veuillez rééssayer plutard',
              severity: 'error',
            })
            setOpenS(true)
          }
        })

      const socket = io(process.env.REACT_APP_URL_SOCKET_LINK as string)
      socket.emit('newCreation', {
        category: values.category,
        session: values.session,
        department: values.department,
        nom: nom,
        profil_img: profil_img,
      })
    },
    enableReinitialize: true,
  })

  const reorder = (list: question[], startIndex: number, endIndex: number) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  function onDragEnd(result: any) {
    if (!result.destination) {
      return
    }
    var questionItem = [...questions]
    const item = reorder(
      questionItem,
      result.source.index,
      result.destination.index
    )
    setQuestions(item)
  }

  function TransitionUp(props: TransitionProps): JSX.Element {
    return <Slide {...props} direction="up" />
  }

  const submitButtonSx = {
    ...(success === 'default'
      ? {
          bgcolor: theme.palette.primary.main,
        }
      : success === 'success'
      ? {
          bgcolor: theme.common.submitBtnSuccess,
        }
      : {
          bgcolor: theme.common.submitBtnEchec,
        }),
  }

  useBeforeunload(() => 'Are you sure to close this tab?')

  function componentWillUnmount(): void {
    alert(
      "Attention!!! Les informations de l'épreuve en cours de création seront perdues. Aucune autre manoeuvre de récupération n'est encore possible."
    )
  }

  function componentDidMount(): void {
    alert(
      "Attention!!! Les informations de l'épreuve que vous créérez doivent être enregistrer avant tout tentative de sortie de cette page. Aucune autre manoeuvre de récupération n'est encore possible."
    )
  }

  useEffect(() => {
    componentDidMount()
    return () => {
      componentWillUnmount()
    }
  }, [])
  return (
    <Box component="section" p={3} display="grid" justifyContent="center">
      <Box component="form" onSubmit={handleSubmit} width="53rem">
        <Box
          p={3}
          sx={{
            width: '50rem',
            bgcolor: '#F5F0F0',
            borderTop: `15px solid ${theme.palette.primary.main}`,
            borderRadius: '8px',
          }}
        >
          <Typography variant="h4" textAlign="center" fontWeight="500">
            Informations de l'épreuve
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              paddingTop: '25px',
            }}
          >
            <Box display="grid" gap="15px">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Session"
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue)
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <Autocomplete
                disablePortal
                id="category"
                value={values.category}
                onChange={(event, val) => setFieldValue('category', val)}
                isOptionEqualToValue={(option, value) => option === value}
                options={dataCategoryOfLicence.map((option) => option.label)}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Catégorie" />
                )}
              />
            </Box>
            <Box display="grid" gap="15px">
              <Autocomplete
                id="country"
                disablePortal
                options={countries}
                sx={{ width: 300 }}
                onChange={(event, val) => setFieldValue('country', val?.label)}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option === value}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <img
                      loading="lazy"
                      width="20"
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      alt=""
                    />
                    {option.label} ({option.code})
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputProps={{ ...params.inputProps }}
                    label="Pays"
                  />
                )}
              />
              <Autocomplete
                disablePortal
                id="department"
                value={values.department}
                onChange={(event, val) => setFieldValue('department', val)}
                isOptionEqualToValue={(option, value) => option === value}
                options={
                  values.country === 'Cameroun'
                    ? department.map((option) => option.name)
                    : []
                }
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Département" />
                )}
              />
            </Box>
          </Box>
          <Box
            display="grid"
            justifyContent="center"
            paddingTop="10px"
            width="50rem"
          >
            <Autocomplete
              id="language"
              disablePortal
              options={languages}
              sx={{ width: 300 }}
              onChange={(event, val) => setFieldValue('language', val?.code)}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) =>
                option.label === value.label
              }
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  <img
                    loading="lazy"
                    width="20"
                    src={`https://flagcdn.com/w20/${option.country_code.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${option.country_code.toLowerCase()}.png 2x`}
                    alt=""
                  />
                  {option.label} ({option.code})
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  inputProps={{ ...params.inputProps }}
                  label="Langue"
                />
              )}
            />
          </Box>
        </Box>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <Box {...provided.droppableProps} ref={provided.innerRef}>
                {questionsUI(
                  questions,
                  setQuestions,
                  open,
                  feedBack,
                  setFeedBack,
                  setOpen
                )}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={1}
        >
          <Typography variant="subtitle1" color="#555">
            questions restantes {40 - values.questionss.length}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ m: 1, position: 'relative' }}>
              <Fab
                arial-label="save"
                color="primary"
                id="saveBtn"
                sx={submitButtonSx}
                disabled={
                  values.questionss.length !== 40 ? true : false || loading
                }
                type="submit"
              >
                {success === 'default' ? (
                  <SaveIcon />
                ) : success === 'success' ? (
                  <CheckIcon />
                ) : (
                  <ClearIcon />
                )}
              </Fab>
              {loading && (
                <CircularProgress
                  size={68}
                  sx={{
                    position: 'absolute',
                    zIndex: 1,
                    top: -6,
                    left: -6,
                    color: theme.common.submitBtnSuccess,
                  }}
                />
              )}
            </Box>
            <Box sx={{ m: 1, position: 'relative' }}>
              <Button
                id="saveBtn"
                variant="contained"
                type="submit"
                disabled={
                  values.questionss.length !== 40 ? true : false || loading
                }
                sx={submitButtonSx}
              >
                Valider
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    top: 6,
                    left: 30,
                    color: theme.common.submitBtnSuccess,
                  }}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={openS}
        onClose={() => setOpenS(false)}
        TransitionComponent={TransitionUp}
        autoHideDuration={6000}
      >
        <Alert
          onClose={() => setOpenS(false)}
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

export default FormSheet
