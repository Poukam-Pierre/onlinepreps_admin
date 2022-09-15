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

function FormSheet() {
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

  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      id_: formId,
      session: date,
      category: 'B',
      country: 'Cameroun',
      department: 'Haute-Sanaga',
      questionss: questions,
    },
    onSubmit: (values) => {
      console.log(values)
      // Ici entre l'appelle API REST
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
                value={values.department}
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
