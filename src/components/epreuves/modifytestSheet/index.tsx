// Made by Poukam Ngamaleu

import { Autocomplete, Box, Button, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import Axios from 'axios'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import {
  countries,
  dataCategoryOfLicence,
  dataTest,
  department,
} from '../../../utils/dataWorking'
import { theme } from '../../../utils/style/theme'
import { question } from '../../formSheet/functionSheet'
import questionsUI from '../../formSheet/questionUI'

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
const testSheets: question[] = dataTest.questions
const testSheetInfo: {
  langueType: string
  epreuveId: string
  session: string
  department: string
  category: string
  user_created: string
  creation_date: string
  is_in_production: boolean
} = dataTest.dataTestInfos

function ModifyTestSheet() {
  const { testId } = useParams()
  const [feedBack, setFeedBack] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)

  const [questions, setQuestions] = useState<question[]>([...testSheets])

  useEffect(() => {
    // TODO FETCH DATA FROM bdd
    Axios.get(`http://localhost:3000/api/employe/getExamModif/${testId}`)
      .then((res) => {
        if (res?.status === 200 && res.data) {
          setQuestions(res.data)
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log(err.response.data.message)
        }
      })
  }, [])

  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      id_: testId,
      session: testSheetInfo.session,
      category: testSheetInfo.category,
      country: 'Cameroun',
      department: testSheetInfo.department,
      questionss: questions,
    },
    onSubmit: (values) => {
      console.log(values)
      // Ici entre l'appelle des différents API REST
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

export default ModifyTestSheet
