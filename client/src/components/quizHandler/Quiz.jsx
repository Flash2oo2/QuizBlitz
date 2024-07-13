import { useEffect, useState } from "react";
import styled from "styled-components";
import Question from "./Question";
import CountDownTimer from "../CountDownTimer"; // Import the timer component

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f0f4f8;
`;

const IntroSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const TimerContainer = styled.div`
  margin-right: 2rem;

  @media (max-width: 600px) {
    margin-right: 0;
    margin-bottom: 1rem;
  }
`;

const TextContainer = styled.div`
  text-align: left;

  @media (max-width: 600px) {
    text-align: center;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #34495e;
  max-width: 600px;
  margin: 0 auto;
`;

const QuizContainer = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 2rem;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

const QuizInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const QuestionNumber = styled.span`
  font-weight: bold;
  color: #3498db;

  @media (max-width: 600px) {
    margin-bottom: 0.5rem;
  }
`;

const Score = styled.span`
  background-color: #2ecc71;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;

  @media (max-width: 600px) {
    margin-bottom: 0.5rem;
  }
`;

const QuizFooter = styled.div`
  text-align: center;
  margin-top: 2rem;
  font-style: italic;
  color: #7f8c8d;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #e74c3c;
  font-size: 1.2rem;
  margin-top: 2rem;
`;

const Quiz = ({ questions, score, setScore, setQuestions, userId, exam_id, hoursMinSecs, url }) => {
  const [options, setOptions] = useState();
  const [currQues, setCurrQues] = useState(0);
  const [correct, setCorrect] = useState();

  useEffect(() => {
    startFunction();
  }, [currQues, questions]);

  const startFunction = () => {
    if (questions[currQues]) {
      const data = questions[currQues].options;
      setOptions(data);

      const correctOption = data.find(option => option.isCorrect);
      if (correctOption) {
        setCorrect(correctOption.option);
      }
    }
  };

  if (!questions || questions.length === 0) {
    return (
      <PageWrapper>
        <ErrorMessage>
          <h2>Oops!</h2>
          <p>We couldn't find any questions for this quiz. Please try again later.</p>
        </ErrorMessage>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <IntroSection>
        <TimerContainer>
          <CountDownTimer hoursMinSecs={hoursMinSecs} url={url} />
        </TimerContainer>
        <TextContainer>
          <Title>Knowledge Challenge</Title>
          <Subtitle>Test your skills, expand your mind, and embrace the journey of learning!</Subtitle>
        </TextContainer>
      </IntroSection>
      <QuizContainer>
        <QuizInfo>
          <QuestionNumber>Question {currQues + 1}/{questions.length}</QuestionNumber>
          <Score>Score: {score}</Score>
        </QuizInfo>
        <Question
          currQues={currQues}
          setCurrQues={setCurrQues}
          questions={questions}
          options={options}
          correct={correct}
          score={score}
          setScore={setScore}
          setQuestions={setQuestions}
          userId={userId}
          exam_id={exam_id}
        />
        <QuizFooter>
          <p>Stay focused and do your best!</p>
        </QuizFooter>
      </QuizContainer>
    </PageWrapper>
  );
};

export default Quiz;
