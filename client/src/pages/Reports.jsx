import Footer from '../components/Footer'
import LoginNavbar from '../components/LoginNavbar'
import styled from 'styled-components'
import { publicRequest } from '../requestMethods'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/loader'

const Container = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 4% 7%;
`;

const ContentWrapper = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
`;

const Header = styled.h1`
  text-align: center;
  color: #222831;
  margin-bottom: 30px;
  font-size: 2.5rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 15px;
`;

const Th = styled.th`
  text-align: left;
  padding: 15px;
  background-color: #393E46;
  color: #EEEEEE;
  font-size: 1.1rem;
  &:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  &:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

const Td = styled.td`
  padding: 15px;
  background-color: #ffffff;
  &:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  &:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

const Tr = styled.tr`
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const Button = styled.button`
  background-color: #00ADB5;
  color: #EEEEEE;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  padding: 10px 20px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #007A7E;
  }
`;

const StatusBadge = styled.span`
  border-radius: 20px;
  padding: 8px 15px;
  font-weight: 600;
  font-size: 14px;
  color: #EEEEEE;
  background-color: ${props => props.solved ? "#CC0000" : "#007E33"};
`;

const Reports = (CUId) => {
  const [userDatas, setUserDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [examDatas, setExamDatas] = useState([]);

  useEffect(() => {
    getUserDatas()
    getExamDatas()
  }, [])

  const getUserDatas = async () => {
    const { data } = await publicRequest.get(`/userexams/` + CUId.CUId)
    setUserDatas(data)
  }

  const getExamDatas = async () => {
    const response = await publicRequest.get(`/exam`)
    setExamDatas(response.data)
    setIsLoading(false)
  }

  if (isLoading) {
    return (
      <>
        <LoginNavbar />
        <Loader />
      </>
    );
  }

  return (
    <>
      <LoginNavbar />
      <Container>
        <ContentWrapper>
          <Header>Status Report</Header>
          <Table>
            <thead>
              <Tr>
                <Th>Exam Name</Th>
                <Th>Action</Th>
                <Th>Status</Th>
              </Tr>
            </thead>
            <tbody>
              {examDatas.map((exam, index) => (
                <Tr key={index}>
                  <Td>{exam.examname}</Td>
                  <Td>
                    <Link to={`/quiz/${exam._id}`}>
                      <Button>Go to exam</Button>
                    </Link>
                  </Td>
                  <Td>
                    <StatusBadge solved={userDatas.findIndex(u => u.examId === exam._id) > -1}>
                      {userDatas.findIndex(u => u.examId === exam._id) > -1 ? "Solved" : "Available"}
                    </StatusBadge>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </ContentWrapper>
      </Container>
      <Footer />
    </>
  )
}

export default Reports