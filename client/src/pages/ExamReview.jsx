import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import LoginNavbar from '../components/LoginNavbar'
import styled from 'styled-components'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useParams } from 'react-router-dom'
import { publicRequest } from '../requestMethods'
import Loader from '../components/loader'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 2rem 0;
`

const Wrapper = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`

const QuestionCard = styled(Paper)`
  margin-bottom: 2rem;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`

const QuestionTitle = styled.h3`
  color: #4285F4;
  margin-bottom: 1rem;
`

const AnswerContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`

const AnswerLabel = styled.span`
  font-weight: 600;
  margin-right: 0.5rem;
`

const UserAnswer = styled.span`
  color: ${props => props.isCorrect ? '#007E33' : '#FF8800'};
`

const CorrectAnswer = styled.span`
  color: #007E33;
`

const ExamReview = () => {
  const [examQuestions, setExamQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    getExamInfos()
  }, [])

  const getExamInfos = async () => {
    try {
      const { data } = await publicRequest.get(`/userexams/exam/${id}`)
      setExamQuestions(data)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching exam info:", error)
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <>
        <LoginNavbar />
        <Loader />
      </>
    )
  }

  return (
    <>
      <LoginNavbar />
      <Container>
        <Wrapper>
          {examQuestions.map((exam) => (
            exam.examReview.map((question, index) => (
              <QuestionCard key={index} elevation={3}>
                <QuestionTitle>{`Question ${index + 1}: ${question.qTitle}`}</QuestionTitle>
                <AnswerContainer>
                  <AnswerLabel>Your Answer:</AnswerLabel>
                  <UserAnswer isCorrect={question.qAnswers === question.qCorrect}>
                    {question.qAnswers}
                  </UserAnswer>
                </AnswerContainer>
                <AnswerContainer>
                  <AnswerLabel>Correct Answer:</AnswerLabel>
                  <CorrectAnswer>{question.qCorrect}</CorrectAnswer>
                </AnswerContainer>
              </QuestionCard>
            ))
          ))}
        </Wrapper>
      </Container>
      <Footer />
    </>
  )
}

export default ExamReview