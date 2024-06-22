import React from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

const GlobalStyles = createGlobalStyle`
 * {
      box-sizing: border-box;
  }
html,  
body {
    margin: 0;
    padding: 0;
    height: 100%;
  }
`;
const pulsing = keyframes`
           to {
                  transform: perspective(300px) translateZ(180px);
                  opacity: 0;
              }
`;

const Container = styled.div`
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh; /* Full viewport height */
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              background: rgba(255, 255, 255, 0.8);
              z-index : 200 ;
`;
const Thunder = styled.div`
              width: 65px;
              height: 117px;
              position: relative;
              &:before,
              &:after {
               content: "";
              position: absolute;
              inset: 0;
              background: #ff8001;
              box-shadow: 0 0 0 50px;
              clip-path: polygon(25% 0%, 70% 0%, 44% 40%, 78% 28%, 20% 100%, 40% 55%, 3% 60%);
              }

              &:after {
              animation: ${pulsing} 1s infinite;
              transform: perspective(300px) translateZ(0px);
              }
`;

const Loader = () => {
    return (
        <>
            <GlobalStyles />
            <Container>
                <Thunder>
                </Thunder>
            </Container>
        </>
    );
}

export default Loader;
