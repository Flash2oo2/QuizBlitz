import styled from "styled-components"
import LoginNavbar from "../components/LoginNavbar";
import Footer from "../components/Footer";
import { BarChart, Delete, Edit, Visibility, Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Popup from 'reactjs-popup';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { publicRequest } from "../requestMethods";
import Loader from "../components/loader";

const Container = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 2rem 0;
`;

const Wrapper = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.h1`
  color: #222831;
  margin-bottom: 2rem;
  text-align: center;
`;

const CreateButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 50px;
  background-color: #00ADB5;
  color: #EEEEEE;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 2rem;

  &:hover {
    background-color: #008C9E;
  }
`;

const ExamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const ExamCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ExamName = styled.h3`
  color: #222831;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  color: #393E46;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }

  svg {
    margin-right: 0.3rem;
  }
`;

const PopupContent = styled.div`
  background-color: rgb(255,255,255);
  padding: 2rem;
  border-radius: 10px;
  width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const PopupInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-bottom: 1rem;
  background-color: rgba(245, 245, 245, 0.9);
`;

const PopupButton = styled.button`
  background-color: #00ADB5;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #008C9E;
  }
`;

const Dashboard = ({ CUId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [examName, setExamName] = useState("");
  const [examNameStorage, setExamNameStorage] = useState([]);
  const [dummy, setDummy] = useState(0);

  const notify = () => toast.success("Link successfully copied to the clipboard");

  const getExamNames = async () => {
    const { data } = await publicRequest.get(`/exam/${CUId}`);
    setExamNameStorage(data);
    setIsLoading(false);
  }

  const deleteExam = (id) => {
    publicRequest.delete(`/exam/${id}`).then(() => {
      setDummy(dummy + 1);
    });
  }

  useEffect(() => {
    getExamNames();
  }, [examName, dummy]);

  const handleName = (e) => {
    e.preventDefault();
    if (examName === "") {
      toast.error("Please enter an exam name");
    } else {
      const newExam = {
        creatorUserId: CUId,
        examname: examName,
      };
      publicRequest.post("/exam/", newExam).then(() => {
        setDummy(dummy + 1);
        toast.success("Exam created successfully");
      });
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
          <Header>Your Exams</Header>
          <Popup
            trigger={
              <CreateButton>
                <Add style={{ marginRight: '0.5rem' }} />
                Create Exam
              </CreateButton>
            }
            modal
            nested
          >
            {close => (
              <PopupContent>
                <h2>New Exam</h2>
                <form onSubmit={handleName}>
                  <PopupInput
                    type="text"
                    placeholder='Enter title for your exam'
                    onChange={e => setExamName(e.target.value)}
                    required
                  />
                  <PopupButton type="submit">Create</PopupButton>
                </form>
              </PopupContent>
            )}
          </Popup>
          <ExamGrid>
            {examNameStorage.map((exam) => (
              <ExamCard key={exam._id}>
                <ExamName onClick={() => {
                  navigator.clipboard.writeText(`https://quizblitz-v1.netlify.app/quiz/${exam._id}`);
                  notify();
                }}>
                  {exam.examname}
                </ExamName>
                <ButtonGroup>
                  <Link to={`/anlyze/${exam._id}`}>
                    <ActionButton><BarChart />Analyze</ActionButton>
                  </Link>
                  <Link to={`/quiz/${exam._id}`}>
                    <ActionButton><Visibility />Preview</ActionButton>
                  </Link>
                  <Link to={`/create/${exam._id}`}>
                    <ActionButton><Edit />Edit</ActionButton>
                  </Link>
                  <ActionButton onClick={() => deleteExam(exam._id)}>
                    <Delete />Delete
                  </ActionButton>
                </ButtonGroup>
              </ExamCard>
            ))}
          </ExamGrid>
        </Wrapper>
      </Container>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default Dashboard;
