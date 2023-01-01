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
import { useState, useEffect } from 'react'
import { theme } from '../../../utils/style/theme'
import { useParams } from 'react-router-dom'
import Axios from 'axios'

export interface Proposition {
  libele_propo: string
  is_answer?: boolean
}

export interface question {
  libele_quest: string
  libele_propo: string[]
  image?: string
  open?: boolean
  commentaire: string
}

function ViewTestSheet() {
  const { testId } = useParams()
  const [valueChecked] = useState<string>()
  const [questions, setQuestions] = useState<question[]>()

  useEffect(() => {
    // TODO FETCH DATA FROM bdd
    Axios.get(
      `${process.env.REACT_APP_URL_REMOTE_LINK}/employe/getExamView/${testId}`
    )
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
        {questions?.map((question, index_1) => (
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
                      {question.libele_quest}
                    </Typography>
                  </Box>
                  <Box
                    paddingLeft="10px"
                    sx={{
                      display: question.image ? 'flex' : 'none',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      src={question.image}
                      alt="image relatif à la question"
                      style={{ width: '15rem' }}
                    />
                  </Box>
                  <FormControl>
                    <RadioGroup value={valueChecked}>
                      {question.libele_propo.map((option, index) => (
                        <Box key={index} paddingLeft="20px">
                          <FormControlLabel
                            value={option}
                            control={<Radio />}
                            label={<Typography>{option}</Typography>}
                          />
                        </Box>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography textAlign="justify">
                  {question.commentaire}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default ViewTestSheet
