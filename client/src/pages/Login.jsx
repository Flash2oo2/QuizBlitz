import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import styled, { createGlobalStyle } from 'styled-components';
import { publicRequest } from "../requestMethods";
import { Fragment, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useDispatch } from "react-redux";
import { login } from "../redux/apiCalls";
import Loader from "../components/loader";
import {
  GlobalStyles,
  Head,
  Text,
  Span,
  Link,
  Input,
  Form,
  Container,
  FormContainer,
  SocialContainer,
  Button,
  OverlayContainer,
  OverlayPanel,
  Overlay
} from "../components/loginstyle";



const Login = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [panelActive, setPanelActive] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSignInEvent = () => {
    setPanelActive(false);
  };

  const onSignUpEvent = () => {
    setPanelActive(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const userCheck = {
      email: email,
      password: password,
    };
    try {
      publicRequest.post("/users/login", userCheck).then((response) => {
        console.log(response.status);
        console.log(response.data);
        login(dispatch, { email, password });
        console.log("data suc");
        navigate("/dashboard");
      });
    } catch {
      setIsLoading(false);
      alert("Something went wrong");
    }

  };

  const handleRegister = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const registered = {
      firstname: name,
      lastname: lastName,
      email: email,
      password: pass,
    };
    console.log(registered);
    publicRequest.post("/users/", registered).then((response) => {
      console.log(response.status);
      console.log(response.data);
      setPanelActive(false);
      setIsLoading(false);
    });
  };

  return (
    <>

      <GlobalStyles />
      {isLoading && <Loader />}
      <Container
        id="container"
        className={`${panelActive ? "right-panel-active" : ""}`}
      >
        <FormContainer className="sign-up-container">
          <Form onSubmit={handleRegister}>
            <Head>Create Account</Head>
            <SocialContainer>
              <Link href="#" className="social">
                <i className="fab fa-google-plus-g">
                  <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" width="30px" />
                </i>
              </Link>
              <Link href="#" className="social">
                <i className="fab fa-linkedin-in">
                  <img src="https://img.icons8.com/?size=100&id=13930&format=png&color=000000" width="30px" />
                </i>
              </Link>
            </SocialContainer>
            <Span>or use your email for registration</Span>
            <Input placeholder="Email (username)" type="email" onChange={(e) => setEmail(e.target.value)} required />
            <Input placeholder="First Name" type="text" onChange={(e) => setName(e.target.value)} required />
            <Input placeholder="Last Name" type="text" onChange={(e) => setLastName(e.target.value)} required />
            <Input placeholder="Password" type="password" onChange={(e) => setPass(e.target.value)} required />
            <Button type="submit">Sign Up</Button>
          </Form>
        </FormContainer>
        <FormContainer className="sign-in-container">
          <Form onSubmit={handleLogin}>
            <Head>Sign In</Head>
            <SocialContainer>
              <Link href="#" className="social">
                <i className="fab fa-google-plus-g">
                  <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" width="30px" /></i>
              </Link>
              <Link href="#" className="social">
                <i className="fab fa-linkedin-in">
                  <img src="https://img.icons8.com/?size=100&id=13930&format=png&color=000000" width="30px" /></i>
              </Link>
            </SocialContainer>
            <Span>or use your account</Span>
            <Input placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required />
            <Input placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required />
            <Link href="#">Forgot your password?</Link>
            <Button type="submit">Sign In</Button>
          </Form>
        </FormContainer>
        <OverlayContainer>
          <Overlay>
            <OverlayPanel className="overlay-left">
              <Head>Welcome Back!</Head>
              <Text>
                To keep connected with us please login with your personal info
              </Text>
              <Button className="ghost" id="signIn" onClick={onSignInEvent}>
                Sign In
              </Button>
            </OverlayPanel>
            <OverlayPanel className="overlay-right">
              <Head>Hello, Friend!</Head>
              <Text>Enter your personal details and start journey with us</Text>
              <Button className="ghost" id="signUp" onClick={onSignUpEvent}>
                Sign Up
              </Button>
            </OverlayPanel>
          </Overlay>
        </OverlayContainer>
      </Container>
    </>
  );
};

export default Login;
