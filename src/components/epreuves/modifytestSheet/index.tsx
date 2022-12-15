// Made by Poukam Ngamaleu

import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Slide,
  SlideProps,
  Snackbar,
  Typography,
} from '@mui/material'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import Axios from 'axios'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useBeforeunload } from 'react-beforeunload'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import {
  countries,
  dataCategoryOfLicence,
  department,
} from '../../../utils/dataWorking'
import { theme } from '../../../utils/style/theme'
import { alertMsgInterface } from '../../employe/createEmploy'
import { question } from '../../formSheet/functionSheet'
import questionsUI from '../../formSheet/questionUI'
import { useNavigate } from 'react-router-dom'

// Chargement des données statiques de la BDD
const categoryArray: string[] = []
const dataDepartment: string[] = []
const dataCountry: string[] = []

// eslint-disable-next-line array-callback-return
department.map(({ name }) => {
  dataDepartment.push(name)
})
// eslint-disable-next-line array-callback-return
dataCategoryOfLicence.map(({ label }) => {
  categoryArray.push(label)
})
// eslint-disable-next-line array-callback-return
countries.map(({ label }) => {
  dataCountry.push(label)
})

interface testSheetInfoInterface {
  session: string
  language: string
  department: string
  category: string
}
type TransitionProps = Omit<SlideProps, 'direction'>

function ModifyTestSheet() {
  const navigate = useNavigate()
  const { testId } = useParams()
  const [feedBack, setFeedBack] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [openS, setOpenS] = useState<boolean>(false)
  const [createdMsg, setCreatedMsg] = useState<alertMsgInterface>()
  const [testSheetInfo, setTestSheetInfo] = useState<testSheetInfoInterface>()
  const [questions, setQuestions] = useState<question[]>([])
  const [success, setSuccess] = useState<string>('default')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    // TODO FETCH DATA FROM bdd
    Axios.get(`http://localhost:3000/api/employe/getExamModif/${testId}`)
      .then((res) => {
        if (res?.status === 200 && res.data) {
          setQuestions(res.data.testSheets)
          setTestSheetInfo(res.data.testSheetInfo)
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log(err.response.data.message)
        }
      })
  }, [])

  const languages = [
    { code: 'fr', label: 'Français', country_code: 'fr' },
    { code: 'en', label: 'English', country_code: 'gb' },
  ]

  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      id_: testId,
      category: testSheetInfo?.category,
      session: testSheetInfo?.session,
      country: 'Cameroun',
      language: testSheetInfo?.language,
      department: testSheetInfo?.department,
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
      // Ici entre l'appelle des différents API REST
      const testInformations = new FormData()

      testInformations.append('epreuveId', id_ as string)
      testInformations.append('session', JSON.stringify(session))
      testInformations.append('category', category as string)
      testInformations.append('country', country)
      testInformations.append('language', language as string)
      testInformations.append('department', department as string)
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
        `http://localhost:3000/api/employe/savingExamInfos`,
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

      const socket = io('http://localhost:3000')
      socket.emit('newEpreuve', {
        category: values.category,
        session: values.session,
        department: values.department,
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

  function TransitionUp(props: TransitionProps): JSX.Element {
    return <Slide {...props} direction="up" />
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

  useBeforeunload(() => 'Are you sure to close this tab?')

  function componentWillUnmount(): void {
    alert(
      "Attention!!! Les informations de l'épreuve en cours de modification seront perdues. Aucune autre manoeuvre de récupération n'est encore possible."
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
            // width: '50rem',
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
                  value={values.session}
                  onChange={(newValue) => {
                    setFieldValue('session', newValue)
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <Autocomplete
                disablePortal
                id="category"
                value={values.category || null}
                onChange={(event, val) => setFieldValue('category', val)}
                isOptionEqualToValue={(option, value) => option === value}
                options={categoryArray}
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
                options={dataCountry}
                sx={{ width: 300 }}
                value={values.country}
                onChange={(event, val) => setFieldValue('country', val)}
                isOptionEqualToValue={(option, value) => option === value}
                renderInput={(params) => <TextField {...params} label="Pays" />}
              />
              <Autocomplete
                disablePortal
                id="department"
                value={values.department || null}
                onChange={(event, val) => setFieldValue('department', val)}
                isOptionEqualToValue={(option, value) => option === value}
                options={values.country === 'Cameroun' ? dataDepartment : []}
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
          <Button
            variant="contained"
            type="submit"
            disabled={values.questionss.length !== 10 ? true : false}
            sx={{ bgcolor: theme.palette.primary.main }}
          >
            Enregistrer
          </Button>
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

export default ModifyTestSheet
