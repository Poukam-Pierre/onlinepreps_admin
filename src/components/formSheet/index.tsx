// Made by Poukam Ngamaleu

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  Paper,
  Typography,
} from '@mui/material'
import { Dayjs } from 'dayjs'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { theme } from '../../utils/style/theme'
import CropOriginalIcon from '@mui/icons-material/CropOriginal'
import CloseIcon from '@mui/icons-material/Close'
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined'
import FilterNoneIcon from '@mui/icons-material/FilterNone'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

const categoryArray: string[] = ['A', 'B', 'C', 'D', 'E']

interface Proposition {
  proposition: string
}

interface question {
  questionNumber: number
  questionBody: string
  propositionAnswers: Proposition[]
  open: boolean
}

function FormSheet() {
  const [date, setDate] = useState<Dayjs | null>(null)
  const [questions, setQuestions] = useState<question[]>([
    {
      questionNumber: 1,
      questionBody: 'Comment démarre-t-on un véhicule à moteur',
      propositionAnswers: [
        { proposition: 'Avec la clé' },
        { proposition: 'Avec une télécomande de démarage automatique' },
        { proposition: 'Les deux' },
      ],
      open: true,
    },
  ])
  function handleChangeQuestionBody(text: string, index: number) {
    var newQuestion = [...questions]
    newQuestion[index].questionBody = text
    setQuestions(newQuestion)
  }
  function handleChangeOptionValue(
    text: string,
    index_1: number,
    index_2: number
  ) {
    var newPropositions = [...questions]
    newPropositions[index_1].propositionAnswers[index_2].proposition = text
    setQuestions(newPropositions)
  }
  function removeOption(index_1: number, index_2: number) {
    var removePropositions = [...questions]
    if (removePropositions[index_1].propositionAnswers.length > 1) {
      removePropositions[index_1].propositionAnswers.splice(index_2, 1)
      setQuestions(removePropositions)
    }
  }

  function addOption(index: number) {
    var optionOfQuestion = [...questions]
    if (optionOfQuestion[index].propositionAnswers.length < 7) {
      optionOfQuestion[index].propositionAnswers.push({
        proposition:
          ' option ' + (optionOfQuestion[index].propositionAnswers.length + 1),
      })
    }
    setQuestions(optionOfQuestion)
  }

  function copyQuestion(index: number) {
    let question = [...questions]
    var copyQuestion = question[index]
    setQuestions([...questions, copyQuestion])
  }
  function deleteQuestion(index: number) {
    var question = [...questions]
    if (question.length > 1) {
      question.splice(index, 1)
    }
    setQuestions(question)
  }

  function addMoreQuestionField() {
    setQuestions([
      ...questions,
      {
        questionNumber: 2,
        questionBody: '',
        propositionAnswers: [{ proposition: 'option 1' }],
        open: true,
      },
    ])
  }

  function questionsUI() {
    return questions.map((quest, index_1) => (
      <Accordion
        key={index_1}
        expanded={quest.open}
        sx={{
          bgcolor: '#F5F0F0',
          borderLeft: quest.open ? `8px solid #ced200` : '',
        }}
      >
        <AccordionSummary
          sx={{
            elevation: 10,
            width: '100%',
            '&.MuiAccordionSummary-root': {
              display: quest.open ? 'none' : 'initilal',
            },
          }}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {!quest.open ? (
            <Box>
              <Typography variant="h6">
                {index_1 + 1}. {quest.questionBody}
              </Typography>
              {quest.propositionAnswers.map((option, index) => (
                <Box key={index} paddingLeft="20px">
                  <FormControlLabel
                    disabled
                    control={<Checkbox />}
                    label={<Typography>{option.proposition}</Typography>}
                  />
                </Box>
              ))}
            </Box>
          ) : (
            ''
          )}
        </AccordionSummary>
        <Box
          sx={{ display: 'grid', gridAutoFlow: 'column' }}
          position="relative"
        >
          <AccordionDetails>
            {quest.open ? (
              <Box>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  padding="0 5px 15px 10px"
                >
                  <TextField
                    placeholder="Intitulé de la question"
                    variant="filled"
                    value={quest.questionBody}
                    sx={{ width: '30rem' }}
                    onChange={(e) =>
                      handleChangeQuestionBody(e.target.value, index_1)
                    }
                  />
                  <IconButton>
                    <CropOriginalIcon sx={{ fontSize: 30 }} />
                  </IconButton>
                </Box>
                {quest.propositionAnswers.map((option, index_2) => (
                  <Box
                    key={index_2}
                    sx={{
                      display: 'flex',
                      alignItems: 'end',
                      padding: '0 10px 0px 20px',
                      justifyContent: 'space-between',
                    }}
                  >
                    <FormControlLabel
                      disabled
                      control={<Checkbox />}
                      label={
                        <TextField
                          placeholder="Option"
                          variant="filled"
                          value={option.proposition}
                          onChange={(e) =>
                            handleChangeOptionValue(
                              e.target.value,
                              index_1,
                              index_2
                            )
                          }
                          sx={{
                            width: '30rem',
                            '& .MuiInputBase-input': {
                              bgcolor: '#F5F0F0',
                            },
                            '& ::before': {
                              borderBottom: 'none',
                            },
                          }}
                        />
                      }
                      sx={{ alignItems: 'end' }}
                    />

                    <IconButton
                      onClick={() => removeOption(index_1, index_2)}
                      sx={{
                        display:
                          quest.propositionAnswers.length === 1
                            ? 'none'
                            : 'initial',
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                ))}
                {quest.propositionAnswers.length < 7 ? (
                  <Box padding="10px 10px 10px 20px">
                    <FormControlLabel
                      disabled
                      control={<Checkbox />}
                      label={
                        <Button
                          sx={{ textTransform: 'none' }}
                          onClick={() => addOption(index_1)}
                        >
                          Ajouter option
                        </Button>
                      }
                      sx={{ alignItems: 'end' }}
                    />
                  </Box>
                ) : (
                  ''
                )}
                <Divider />
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  padding="10px 10px 0px 10px"
                >
                  <Button
                    sx={{
                      size: 'small',
                      textTransform: 'none',
                      fontSize: '15px',
                      gap: '10px',
                    }}
                  >
                    <AssignmentTurnedInOutlinedIcon /> Clé réponse
                  </Button>
                  <Box display="flex" gap="20px">
                    <IconButton onClick={() => copyQuestion(index_1)}>
                      <FilterNoneIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteQuestion(index_1)}>
                      <DeleteOutlinedIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            ) : (
              ''
            )}
          </AccordionDetails>
          <Box
            component={Paper}
            height="fit-content"
            width="fit-content"
            position="absolute"
            right="-3.5rem"
            bgcolor="#F5F0F0"
          >
            <IconButton onClick={addMoreQuestionField}>
              <AddCircleOutlineIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </Box>
        </Box>
      </Accordion>
    ))
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
      <Box>{questionsUI()}</Box>
    </Box>
  )
}

export default FormSheet
