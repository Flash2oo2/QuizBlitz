import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import LoginNavbar from '../components/LoginNavbar'
import styled from 'styled-components'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ArrowForward } from '@mui/icons-material';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { publicRequest } from '../requestMethods';
import Loader from '../components/loader';

const Container = styled.table`
      width: 100%;
      height:40vh;
      border-collapse: collapse;
      text-align: center;
      border-radius:8px;
      overflow: hidden;
      background-color:#EEEEEE;
  `;
const Wrapper = styled.div`
  width:86%;
  margin:7%;
  max-width:1300px;
  `
const Check = styled.input`
  transform : scale(1.5);
    margin:20px;
    color:;
  `
const Label = styled.label`
  color:;
  maxWidth:1400px;
  `
const Button = styled.button`
font-size:16px;
margin:10px;
padding:10px;
border:none;
border-radius:5px;
background-color:#0275d8;
color:#EEEEEE;
cursor: pointer;
&:hover {
    background-color: #228CE9;
  }
  `
const NextButton = styled.button`
font-size:16px;
margin:10px;
padding:10px;
border:none;
border-radius:5px;
background-color:#5cb85c;
color:#EEEEEE;
cursor: pointer;
&:hover {
    background-color: #75DB75;
  }
  `

const ExamReview = () => {

    const [examQuestions, setExamQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const params = useParams();
    const id = params;

    useEffect(() => {
        getExamInfos();
        console.log("check")
    }, [])

    const getExamInfos = async () => {
        const { data } = await publicRequest.get(`/userexams/exam/${id.id}`);
        console.log(data)
        console.log(data[0].examReview[0].qAnswers)
        setExamQuestions(data);
        setIsLoading(false);
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
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow style={{ backgroundColor: "whitesmoke" }}>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            {examQuestions?.map((exam, index) => (
                                <TableBody>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        key={exam._id} >
                                        <TableCell component="th" scope="exam" style={{ color: "#222831", fontSize: "16px", fontWeight: "600", padding: "25px" }}>
                                            {exam.examReview.map((examR, indexi) => (<>
                                                <Label><span style={{ color: "#4285F4" }}>{"Question Title )  "}</span>{examR.qTitle}</Label>
                                                <br /><Check type="radio" name={`${indexi + 1}`} />
                                                <Label><span style={{ color: "#FF8800" }}>{"User Answer ) "}</span> {examR.qAnswers}</Label>
                                                <br /><Check type="radio" name={`${indexi + 1}`} />
                                                <Label><span style={{ color: "#007E33" }}>{"Correct Answer ) "}</span>{examR.qCorrect}</Label>
                                                <br />
                                                <br />
                                            </>))}
                                        </TableCell>
                                        <br />
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableBody>
                            ))}
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                </Wrapper>
            </Container>
            <Footer />
        </>
    )
}

export default ExamReview