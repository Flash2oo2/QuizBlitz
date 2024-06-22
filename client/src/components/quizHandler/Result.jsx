import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../Footer";
import LoginNavbar from "../LoginNavbar";
import axios from 'axios'
import { publicRequest } from "../../requestMethods";
import { useParams } from 'react-router-dom'
import Loader from "../loader";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 60vh;
  text-align: center;
`

const Result = () => {

  const [score, setScore] = useState(0);
  const [passGrade, setPassGrade] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const id = params;

  useEffect(() => {
    getExamNames();
  }, [isLoading])

  const getExamNames = async () => {
    console.log(id);
    const { data } = await publicRequest.get(`/userexams/exam/${id.id}`);
    setScore(data[0].grade);
    getPassGrade(data);
  }

  const getPassGrade = async (data) => {
    await publicRequest.get(`/exam/exam/${data[0].examId}`).then((response) => {
      setPassGrade(response.data[0].passGrade);
      setIsLoading(false);
    });

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
        <span>Final Score : {score}</span> <br />
        {passGrade <= score ? (<><span>congratulations you passed the exam</span><br /><img src="https://i.ibb.co/7vPw6r4/Png-Item-30479.png" style={{ height: "200px", width: "300px", marginLeft: "auto", marginRight: "auto" }} /></>) : (<><span>sorry you failed the exam</span><br /><img src="https://www.onlygfx.com/wp-content/uploads/2020/05/fail-stamp-7.png" style={{ height: "200px", width: "300px", marginLeft: "auto", marginRight: "auto" }} /></>)}
        <Link to="/dashboard">
          <button
            variant="contained"
            color="secondary"
            size="large"
            style={{ alignSelf: "center", marginTop: 20, cursor: "pointer" }}
          >
            Go to dashboard
          </button>
        </Link>
      </Container>
      <Footer />
    </>
  );
};

export default Result;