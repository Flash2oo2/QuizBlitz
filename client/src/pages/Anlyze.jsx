import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { publicRequest } from '../requestMethods';
import LoginNavbar from '../components/LoginNavbar';
import Footer from '../components/Footer';
import Loader from '../components/loader';

const Container = styled.div`
  height: 100%;
  margin: 4% 7%;
`;

const Table = styled.table`
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 12px 8px;
  text-align: left;
  background-color: #393E46;
  color: #EEEEEE;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  &:hover {
    background-color: #ddd;
  }
`;

const Header = styled.h1`
  text-align: center;
  padding-bottom: 10px;
  color: #222831;
`;

const Button = styled.button`
  background-color: #393E46;
  color: #EEEEEE;
  border: none;
  border-radius: 15px;
  font-size: 14px;
  cursor: pointer;
  padding: 8px 16px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #55B4BA;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Spinner = styled.div`
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Anlyze = () => {
  const [examInfo, setExamInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    getExamInfos();
  }, []);

  const getExamInfos = async () => {
    try {
      const { data } = await publicRequest.get(`/userexams/examanalysis/${id}`);
      setExamInfo(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching exam data:', error);
      setLoading(false);
    }
  };

  if (loading) {
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
        <Header>Exam Analysis</Header>
        <Table>
          <thead>
            <Tr>
              <Th>User Name</Th>
              <Th>Exam</Th>
              <Th>Score</Th>
              <Th>Review</Th>
            </Tr>
          </thead>
          <tbody>
            {examInfo.map((exam) => (
              <Tr key={exam._id}>
                <Td>{exam.userInfo.username}</Td>
                <Td>{exam.userInfo.examname}</Td>
                <Td>{exam.grade}</Td>
                <Td>
                  <Link to={`/examreview/${exam._id}`}>
                    <Button>Click me</Button>
                  </Link>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <Footer />
    </>
  );
};

export default Anlyze;
