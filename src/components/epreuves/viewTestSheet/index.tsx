/* eslint-disable jsx-a11y/img-redundant-alt */
// Made by Poukam Ngamaleu

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { theme } from '../../../utils/style/theme'
import { useParams } from 'react-router-dom'
import { dataTest } from '../../../utils/dataWorking'

export interface Proposition {
  proposition: string
  is_answer: boolean
}

export interface question {
  questionBody: string
  propositionAnswers: Proposition[]
  questionImg?: string
  file?: string
  open: boolean
  feedback: string
}

const testSheets: question[] = dataTest.questions

function ViewTestSheet() {
  const { testId } = useParams() // pour permettre la recherche de l'épreuve dans la BDD
  const [valueChecked] = useState<string>()
  const [questions] = useState<question[]>([...testSheets])

  // function setStudentAnswer(index_1: number, index: number) {
  //   var question = [...questions]
  //   question[index_1].answerKey = index
  //   setQuestions(question)
  // }

  // function expandOpenAll() {
  //   let question = [...questions]
  //   for (let i = 0; i < questions.length; i++) {
  //     question[i].open = true
  //   }
  //   setQuestions(question)
  // }

  // function checkingResponses() {
  //   expandOpenAll()
  //   var question = [...questions]
  //   for (let i = 0; i < question.length; i++) {
  //     var index = question[i].answerKey
  //     if (index === -1) return
  //     if (question[i].propositionAnswers[index].is_answer === true) {
  //       question[i].propositionAnswers[index].is_tested = true
  //     } else {
  //       question[i].propositionAnswers[index].is_tested = false
  //     }
  //   }
  // }

  return (
    <Box component="section" p={3} display="grid" justifyContent="center">
      <Box width="50rem">
        <Box
          p={3}
          sx={{
            bgcolor: '#F5F0F0',
            borderTop: `15px solid ${theme.palette.primary.main}`,
            borderRadius: '8px',
          }}
        >
          <Typography variant="h4" textAlign="center" fontWeight="500">
            Epreuve du permis de conduire
          </Typography>
        </Box>
        {questions.map((question, index_1) => (
          <Box key={index_1} paddingTop="15px">
            <Accordion sx={{ bgcolor: '#F5F0F0' }}>
              <AccordionSummary>
                <Box width="100%" display="grid" gap="8px">
                  <Box display="flex">
                    <Typography variant="h6" fontSize="1.1rem">
                      {index_1 + 1}.
                    </Typography>
                    <Typography
                      variant="h6"
                      fontSize="1.1rem"
                      paddingLeft="5px"
                    >
                      {question.questionBody}
                    </Typography>
                  </Box>
                  <Box
                    paddingLeft="10px"
                    sx={{
                      display: question.questionImg ? 'flex' : 'none',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      src={question.questionImg}
                      alt="image relatif à la question"
                      style={{ width: '15rem' }}
                    />
                  </Box>
                  <FormControl>
                    <RadioGroup value={valueChecked}>
                      {question.propositionAnswers.map((option, index) => (
                        <Box key={index} paddingLeft="20px">
                          <FormControlLabel
                            value={option.proposition}
                            control={
                              <Radio
                              // onClick={() => setStudentAnswer(index_1, index)}
                              />
                            }
                            label={
                              <Typography>{option.proposition}</Typography>
                            }
                          />
                          {/* {option.is_tested === true ? (
                            <CheckIcon sx={{}} />
                          ) : option.is_tested === false ? (
                            <ClearIcon sx={{}} />
                          ) : null} */}
                        </Box>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography textAlign="justify">{question.feedback}</Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default ViewTestSheet
