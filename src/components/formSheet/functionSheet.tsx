// Made by Poukam Ngamaleu

export const categoryArray: string[] = ['A', 'B', 'C', 'D', 'E']

export interface Proposition {
  propositionId?: string
  proposition: string
  is_answer: boolean
}

export interface question {
  questionId?: string
  questionBody: string
  propositionAnswers: Proposition[]
  questionImg?: string
  file?: string
  open: boolean
  answer?: boolean
  feedback?: string
}

// Functions

export function handleChangeQuestionBody(
  questions: question[],
  text: string,
  index: number,
  setQuestions: any
) {
  var newQuestion = [...questions]
  newQuestion[index].questionBody = text
  setQuestions(newQuestion)
}

export function handleChangeOptionValue(
  questions: question[],
  text: string,
  index_1: number,
  index_2: number,
  setQuestions: any
) {
  var newPropositions = [...questions]
  newPropositions[index_1].propositionAnswers[index_2].proposition = text
  setQuestions(newPropositions)
}

export function removeOption(
  questions: question[],
  index_1: number,
  index_2: number,
  setQuestions: any
) {
  var removePropositions = [...questions]
  if (removePropositions[index_1].propositionAnswers.length > 1) {
    removePropositions[index_1].propositionAnswers.splice(index_2, 1)
    setQuestions(removePropositions)
  }
}

export function removeImage(
  questions: question[],
  index: number,
  setQuestions: any
) {
  var question = [...questions]
  delete question[index].file
  delete question[index].questionImg
  setQuestions(question)
}

export function addOption(
  questions: question[],
  index: number,
  setQuestions: any
) {
  var optionOfQuestion = [...questions]
  if (optionOfQuestion[index].propositionAnswers.length < 7) {
    optionOfQuestion[index].propositionAnswers.push({
      proposition:
        ' option ' + (optionOfQuestion[index].propositionAnswers.length + 1),
      is_answer: false,
    })
  }
  setQuestions(optionOfQuestion)
}

export function copyQuestion(
  questions: question[],
  index: number,
  setQuestions: any
) {
  expandCloseAll(questions, setQuestions)
  let question = [...questions]
  if (question.length !== 40) {
    var copyQuestion = { ...question[index] }
    setQuestions([...questions, copyQuestion])
  }
}

export function deleteQuestion(
  questions: question[],
  index: number,
  setQuestions: any
) {
  var question = [...questions]
  if (question.length > 1) {
    question.splice(index, 1)
  }
  setQuestions(question)
}

function expandCloseAll(questions: question[], setQuestions: any) {
  let question = [...questions]
  for (let i = 0; i < questions.length; i++) {
    question[i].open = false
  }
  setQuestions(question)
}

export function addMoreQuestionField(questions: question[], setQuestions: any) {
  var question = [...questions]
  if (question.length !== 40) {
    expandCloseAll(questions, setQuestions)
    setQuestions([
      ...questions,
      {
        questionBody: 'Question',
        propositionAnswers: [{ proposition: 'option 1', is_answer: false }],
        open: true,
        answer: false,
      },
    ])
  }
}

export function handleExpand(
  questions: question[],
  index: number,
  setQuestions: any
) {
  let question = [...questions]
  for (let i = 0; i < question.length; i++) {
    if (index === i) {
      question[index].open = true
    } else {
      question[i].open = false
    }
    setQuestions(question)
  }
}

export function setPropositionAnswer(
  questions: question[],
  proposition: string,
  index: number,
  index_1: number,
  setQuestions: any
) {
  var question = [...questions]
  question[index_1].propositionAnswers[index].is_answer =
    !question[index_1].propositionAnswers[index].is_answer
  setQuestions(question)
}

export function doneAnswer(
  questions: question[],
  index: number,
  setQuestions: any
) {
  var question = [...questions]
  question[index].answer = !question[index].answer
  setQuestions(question)
}

export function addAnswer(
  questions: question[],
  index: number,
  setQuestions: any
) {
  var question = [...questions]
  question[index].answer = !question[index].answer
  setQuestions(question)
}

export function handleChangeFeedBack(
  questions: question[],
  e: any,
  index: number,
  setQuestions: any,
  feedBack: string,
  setOpen: any
) {
  var question = [...questions]
  question[index].feedback = feedBack
  setQuestions(question)
  handleClose(setOpen)
}

export function deleteFeedBack(
  questions: question[],
  index: number,
  setQuestions: any
) {
  var question = [...questions]
  delete question[index].feedback
  setQuestions(question)
}

export function handleOpen(setOpen: any) {
  setOpen(true)
}
export function handleClose(setOpen: any) {
  setOpen(false)
}

export function photoUpload(
  index: number,
  questions: question[],
  setQuestions: any,
  e: any
) {
  const reader = new FileReader()
  const File = e.target.files[0]
  reader.onloadend = () => {
    var question = [...questions]
    question[index].file = File
    question[index].questionImg = reader.result as string
    setQuestions(question)
  }
  reader.readAsDataURL(File)
}

// export function setFeedBack(
//   questions: question[],
//   text: string,
//   index: number,
//   setQuestions: any
// ) {
//   var newQuestion = [...questions]
//   newQuestion[index].feedback = text
//   setQuestions(newQuestion)
// }

export function handleFeedBack(text: string, setFeedBack: any, setOpen: any) {
  setFeedBack(text)
  setOpen(true)
}
