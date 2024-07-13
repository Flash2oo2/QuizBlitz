import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { publicRequest } from "../../requestMethods";
import LoginNavbar from "../LoginNavbar";
import Footer from "../Footer";
import Loader from "../loader";
import ErrorMessage from "./ErrorMessage";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SingleQuestion = styled.div`
  width: 95%;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 2px solid #bdc3c7;
  border-radius: 15px;
  padding: 20px;
  margin-top: 10px;
  background-color: #ffffff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
`;

const Options = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  align-items: center;
  justify-content: space-around;
  margin: 10px;
`;

const SingleOption = styled.button`
  width: 46%;
  height: 50px;
  padding: 15px 20px;
  margin: 10px;
  border: 2px solid #3498db;
  border-radius: 12px;
  background-color: #ecf0f1;
  color: #2c3e50;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #3498db;
    color: white;
    border-color: #2980b9;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(52, 152, 219, 0.5);
  }

  &.select {
    background-color: #2ecc71;
    color: white;
    border-color: #27ae60;
  }

  &.wrong {
    background-color: #e74c3c;
    color: white;
    border-color: #c0392b;
  }
`;

const Control = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const Question = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  setScore,
  score,
  setQuestions,
  userId,
  exam_id
}) => {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);
  const [pass, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const params = useParams();
  const id = params;

  useEffect(() => {
    handleCreatorUser();
  }, []);

  const handleCreatorUser = async () => {
    const { data } = await publicRequest.get('/exam/exam/' + id.id);
    setPass(data[0].creatorUserId === userId);
    setIsLoading(false);
  };

  const handleSelect = (i) => {
    if (selected === i && selected === correct) return "select";
    else if (selected === i && selected !== correct) return "wrong";
    else if (i === correct) return "select";
  };

  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) {
      setScore(score + 1);
    }
    setError(false);
  };

  const handleNext = () => {
    if (currQues >= questions.length - 1) {
      if (pass) navigate(`/dashboard`);
      else setTimeout(() => { navigate(`/result/${exam_id}`); }, 1000);
    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected();
    } else setError("Please select an option first");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pass) {
      handleNext();
    } else {
      const userExam = {
        userId: userId,
        examId: id.id,
        grade: score,
      };
      await publicRequest.patch(`/userexams/${exam_id}`, userExam).then((response) => {
        handleNext();
      });
    }
  };

  const handleReview = async (i) => {
    if (!pass) {
      const userOptions = {
        examReview: {
          qAnswers: i,
          qCorrect: correct,
          qTitle: questions[currQues].questionTitle,
        }
      };
      await publicRequest.put("/userexams/" + exam_id, userOptions).then((response) => {});
    }
  };

  if (isLoading) {
    return (
      <>
        <LoginNavbar />
        <Loader />
      </>
    );
  }

  return (
    <Container>
      <h1>Question {currQues + 1} :</h1>
      <SingleQuestion>
        <h2>{questions[currQues].questionTitle}</h2>
        <Options>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {options && options.map((option) => (
            <SingleOption
              className={`${selected && handleSelect(option.option)}`}
              key={option._id}
              onClick={() => { handleCheck(option.option); handleReview(option.option); }}
              disabled={selected}
            >
              {option.option}
            </SingleOption>
          ))}
        </Options>
        <Control>
          <button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            onClick={currQues >= questions.length - 1 ? handleSubmit : handleSubmit}
          >
            {currQues >= questions.length - 1 ? "Submit" : "Next Question"}
          </button>
        </Control>
      </SingleQuestion>
    </Container>
  );
};

export default Question;
