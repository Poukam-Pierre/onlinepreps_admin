/* eslint-disable jsx-a11y/img-redundant-alt */
// Mqde by Poukam Ngamaleu

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  Modal,
  Paper,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material'
import { Draggable } from 'react-beautiful-dnd'
import {
  question,
  handleExpand,
  handleChangeQuestionBody,
  handleChangeOptionValue,
  removeOption,
  addOption,
  addAnswer,
  copyQuestion,
  deleteQuestion,
  addMoreQuestionField,
  setPropositionAnswer,
  deleteFeedBack,
  doneAnswer,
  handleChangeFeedBack,
  handleOpen,
  handleClose,
  photoUpload,
  removeImage,
  handleFeedBack,
} from './functionSheet'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import CropOriginalIcon from '@mui/icons-material/CropOriginal'
import CheckIcon from '@mui/icons-material/Check'
import { theme } from '../../utils/style/theme'
import CloseIcon from '@mui/icons-material/Close'
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined'
import FilterNoneIcon from '@mui/icons-material/FilterNone'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined'

function questionsUI(
  questions: question[],
  setQuestions: any,
  open: boolean,
  feedBack: string,
  setFeedBack: any,
  setOpen: any
) {
  return questions.map((quest, index_1) => (
    <Draggable key={index_1} draggableId={`${index_1}id`} index={index_1}>
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          paddingTop="15px"
        >
          <Accordion
            elevation={quest.open ? 3 : 1}
            expanded={quest.open}
            onChange={() => handleExpand(questions, index_1, setQuestions)}
            sx={{
              bgcolor: '#F5F0F0',
              borderLeft: quest.open ? `8px solid #ced200` : '',
            }}
          >
            {!quest.open ? (
              <AccordionSummary
                sx={{
                  width: '100%',
                  '& .MuiAccordionSummary-content': {
                    display: 'flow-root',
                  },
                }}
              >
                <Box display="flex" justifyContent="center">
                  <DragIndicatorIcon
                    sx={{
                      transform: 'rotate(-90deg)',
                      color: '#ae9b9b',
                      fontSize: 20,
                    }}
                  />
                </Box>
                <Box display="flex">
                  <Typography variant="h6">{index_1 + 1}.</Typography>
                  <Typography variant="h6" paddingLeft="5px">
                    {quest.questionBody}
                  </Typography>
                </Box>
                <Box
                  paddingLeft="10px"
                  sx={{
                    display: quest.questionImg ? 'flex' : 'none',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={quest.questionImg}
                    alt="image relatif à la question"
                    style={{ width: '25rem' }}
                  />
                </Box>
                {quest.propositionAnswers.map((option, index) => (
                  <Box key={index} paddingLeft="20px">
                    <FormControlLabel
                      disabled
                      control={<Checkbox />}
                      label={<Typography>{option.proposition}</Typography>}
                    />
                  </Box>
                ))}
              </AccordionSummary>
            ) : null}
            {quest.open ? (
              <Box
                sx={{ display: 'grid', gridAutoFlow: 'column' }}
                position="relative"
              >
                {!quest.answer ? (
                  <>
                    <AccordionDetails>
                      <Box>
                        <Box display="flex" justifyContent="center">
                          <DragIndicatorIcon
                            sx={{
                              transform: 'rotate(-90deg)',
                              color: '#ae9b9b',
                              fontSize: 20,
                            }}
                          />
                        </Box>
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
                              handleChangeQuestionBody(
                                questions,
                                e.target.value,
                                index_1,
                                setQuestions
                              )
                            }
                          />
                          <IconButton component="label" htmlFor="file">
                            <CropOriginalIcon sx={{ fontSize: 30 }} />
                          </IconButton>
                          <input
                            type="file"
                            id="file"
                            style={{ display: 'none' }}
                            onChange={(e) =>
                              photoUpload(index_1, questions, setQuestions, e)
                            }
                          />
                        </Box>
                        <Box
                          paddingLeft="10px"
                          position="relative"
                          sx={{
                            display: quest.questionImg ? 'flex' : 'none',
                            justifyContent: 'center',
                          }}
                        >
                          <img
                            src={quest.questionImg}
                            alt="image relatif à la question"
                            style={{ width: '25rem' }}
                          />
                          <IconButton
                            onClick={() =>
                              removeImage(questions, index_1, setQuestions)
                            }
                            sx={{
                              position: 'absolute',
                              right: '10rem',
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </Box>
                        {quest.propositionAnswers.map((option, index_2) => (
                          <Box
                            key={index_2}
                            sx={{
                              display: 'flex',
                              alignItems: 'flex-end',
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
                                      questions,
                                      e.target.value,
                                      index_1,
                                      index_2,
                                      setQuestions
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
                            <Box
                              display="flex"
                              alignItems="baseline"
                              gap="20px"
                            >
                              <CheckIcon
                                sx={{
                                  display: option.is_answer
                                    ? 'initial'
                                    : 'none',
                                  color: option.is_answer
                                    ? theme.palette.primary.main
                                    : null,
                                }}
                              />
                              <IconButton
                                onClick={() =>
                                  removeOption(
                                    questions,
                                    index_1,
                                    index_2,
                                    setQuestions
                                  )
                                }
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
                                  onClick={() =>
                                    addOption(questions, index_1, setQuestions)
                                  }
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
                            onClick={() =>
                              addAnswer(questions, index_1, setQuestions)
                            }
                          >
                            <AssignmentTurnedInOutlinedIcon /> Clé réponse
                          </Button>
                          <Box display="flex" gap="20px">
                            <IconButton
                              onClick={() =>
                                copyQuestion(questions, index_1, setQuestions)
                              }
                            >
                              <FilterNoneIcon />
                            </IconButton>
                            <IconButton
                              onClick={() =>
                                deleteQuestion(questions, index_1, setQuestions)
                              }
                            >
                              <DeleteOutlinedIcon />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                    </AccordionDetails>
                    <Box
                      component={Paper}
                      height="fit-content"
                      width="fit-content"
                      position="absolute"
                      right="-3.5rem"
                      bgcolor="#F5F0F0"
                    >
                      <IconButton
                        onClick={() => {
                          addMoreQuestionField(questions, setQuestions)
                          setFeedBack('')
                        }}
                      >
                        <AddCircleOutlineIcon sx={{ fontSize: 30 }} />
                      </IconButton>
                    </Box>
                  </>
                ) : (
                  <>
                    <AccordionDetails>
                      <Box>
                        <Box display="flex" gap="10px" padding="10px">
                          <AssignmentTurnedInOutlinedIcon />
                          <Typography>Choix de la bonne réponse</Typography>
                        </Box>
                        <Divider />
                        <Box p={2}>
                          <TextField
                            placeholder="Intitulé de la question"
                            variant="filled"
                            value={quest.questionBody}
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
                          {quest.propositionAnswers.map((option, index) => (
                            <Box
                              key={index}
                              paddingLeft="20px"
                              sx={{
                                bgcolor: option.is_answer ? '#a9def0' : null,
                                borderLeft: option.is_answer
                                  ? `2px solid ${theme.palette.primary.main}`
                                  : null,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingRight: '20px',
                                cursor: 'pointer',
                              }}
                            >
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    onClick={() =>
                                      setPropositionAnswer(
                                        questions,
                                        option.proposition,
                                        index,
                                        index_1,
                                        setQuestions
                                      )
                                    }
                                    checked={option.is_answer}
                                  />
                                }
                                label={
                                  <Typography>{option.proposition}</Typography>
                                }
                              />
                              <CheckIcon
                                sx={{
                                  display: option.is_answer
                                    ? 'initial'
                                    : 'none',
                                  color: option.is_answer
                                    ? theme.palette.primary.main
                                    : null,
                                }}
                              />
                            </Box>
                          ))}
                          <Button
                            sx={{
                              size: 'small',
                              textTransform: 'none',
                              fontSize: '15px',
                              gap: '10px',
                              display: quest.feedback ? 'none' : 'flex',
                            }}
                            onClick={() => handleOpen(setOpen)}
                          >
                            <AssignmentTurnedInOutlinedIcon /> Ajouter
                            commentaire
                          </Button>
                          <Box
                            sx={{
                              display: quest.feedback ? 'block' : 'none',
                              padding: 2,
                              bgcolor: 'white',
                            }}
                          >
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="space-between"
                              paddingBottom="10px"
                            >
                              <Typography variant="h6" fontSize="1.1rem">
                                Commentaire de resultat
                              </Typography>
                              <Box display="flex">
                                <IconButton
                                  onClick={() =>
                                    deleteFeedBack(
                                      questions,
                                      index_1,
                                      setQuestions
                                    )
                                  }
                                >
                                  <DeleteOutlinedIcon />
                                </IconButton>
                                <IconButton
                                  onClick={() =>
                                    handleFeedBack(
                                      quest.feedback as string,
                                      setFeedBack,
                                      setOpen
                                    )
                                  }
                                >
                                  <ModeEditOutlinedIcon />
                                </IconButton>
                              </Box>
                            </Box>
                            <Typography width="46rem" textAlign="justify">
                              {quest.feedback}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Divider />
                      <Box
                        padding="16px 8px 0 "
                        display="flex"
                        justifyContent="end"
                      >
                        <Button
                          variant="outlined"
                          sx={{
                            borderColor: '#c4c4c4',
                            color: '#369DC1',
                            textTransform: 'none',
                          }}
                          onClick={() =>
                            doneAnswer(questions, index_1, setQuestions)
                          }
                        >
                          Enregistrer
                        </Button>
                      </Box>
                      <Modal
                        open={open}
                        onClose={() => handleClose(setOpen)}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Box
                          sx={{
                            bgcolor: '#F5F0F0',
                            width: '35rem',
                            minHeight: '12rem',
                            borderRadius: '10px',
                            padding: '10px',
                          }}
                        >
                          <Typography
                            variant="h5"
                            color="#555"
                            padding="0 0 10px 10px"
                          >
                            Ajouter un commentaire
                          </Typography>
                          <Divider />
                          <TextField
                            label="Entrez le commentaire"
                            multiline
                            maxRows={4}
                            sx={{ width: '100%' }}
                            value={feedBack}
                            onChange={(e) => setFeedBack(e.target.value)}
                          />

                          <Divider />
                          <Box p={2} display="flex" justifyContent="end">
                            <Button
                              sx={{ color: '#555' }}
                              onClick={() => handleClose(setOpen)}
                            >
                              Annuler
                            </Button>
                            <Button
                              variant="contained"
                              onClick={(e) => {
                                handleChangeFeedBack(
                                  questions,
                                  e,
                                  index_1,
                                  setQuestions,
                                  feedBack,
                                  setOpen
                                )
                              }}
                            >
                              Enregistrer
                            </Button>
                          </Box>
                        </Box>
                      </Modal>
                    </AccordionDetails>
                  </>
                )}
              </Box>
            ) : null}
          </Accordion>
        </Box>
      )}
    </Draggable>
  ))
}

export default questionsUI
