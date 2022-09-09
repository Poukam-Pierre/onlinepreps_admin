// Made by Poukam Ngamaleu

import { Autocomplete, Box, Typography } from '@mui/material'
import { Dayjs } from 'dayjs'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { theme } from '../../utils/style/theme'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import questionsUI from './questionUI'
import { categoryArray, question } from './functionSheet'

function FormSheet() {
  const [date, setDate] = useState<Dayjs | null>(null)
  const [feedBack, setFeedBack] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [questions, setQuestions] = useState<question[]>([
    {
      questionBody: 'Comment démarre-t-on un véhicule à moteur',
      propositionAnswers: [
        { proposition: 'Avec la clé', is_answer: false },
        {
          proposition: 'Avec une télécomande de démarage automatique',
          is_answer: false,
        },
        { proposition: 'Les deux', is_answer: false },
      ],
      open: true,
      answer: false,
      answerKey: '',
    },
  ])

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
              options={categoryArray}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Catégorie" />
              )}
            />
          </Box>
          <Box display="grid" gap="15px">
            <Autocomplete
              disablePortal
              options={categoryArray}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Pays" />}
            />
            <Autocomplete
              disablePortal
              options={categoryArray}
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
    </Box>
  )
}

export default FormSheet
