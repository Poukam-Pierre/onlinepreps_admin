// Made by Poukam Ngamaleu

import { Autocomplete, Box, Button, Typography } from '@mui/material'
import { Dayjs } from 'dayjs'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { theme } from '../../utils/style/theme'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import questionsUI from './questionUI'
import { question } from './functionSheet'
import { useFormik } from 'formik'
import {
  countries,
  department,
  dataCategoryOfLicence,
} from '../../utils/dataWorking'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import { useAuth } from '../../utils/context'

function FormSheet() {
  const {
    userInfo: { id },
  } = useAuth()
  const { formId } = useParams()
  const [date, setDate] = useState<Dayjs | null>(null)
  const [feedBack, setFeedBack] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
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
      Axios.post(`http://localhost:3000/api/employe/savingExamInfos/${id}`, {
        id: id_,
        session: session,
        category: category,
        country: country,
        language: language,
        department: department,
      })
        .then((res) => {
          if (res?.status === 201) {
            questionss.map(
              ({ feedback, propositionAnswers, questionBody, file }) => {
                const body = new FormData()
                body.append('feedback', feedback as string)
                body.append(
                  'propositionAnswers',
                  JSON.stringify(propositionAnswers)
                )
                body.append('questionBody', questionBody)
                body.append('file', file as string)
                Axios.post(
                  `http://localhost:3000/api/employe/savingExamQuestions/${id_}`,
                  body
                )
                  .then((res) => {})
                  .catch((err) => {})
              }
            )
          }
        })
        .catch((err) => {})
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

  return (
    <Box component="section" p={3} display="grid" justifyContent="center">
      <Box component="form" onSubmit={handleSubmit}>
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
          <Box display="grid" justifyContent="center" paddingTop="10px">
            <Autocomplete
              id="language"
              disablePortal
              options={languages}
              sx={{ width: 300 }}
              onChange={(event, val) => setFieldValue('language', val?.code)}
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
            disabled={values.questionss.length !== 40 ? true : false}
            sx={{ bgcolor: theme.palette.primary.main }}
          >
            Valider
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default FormSheet
