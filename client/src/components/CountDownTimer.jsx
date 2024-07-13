import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const TimerWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 25px;  
`;

const Timer = styled.div`
  font-family: "Montserrat";
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Text = styled.div`
  color: #aaa;
  font-size: 20px;
  margin-left: 5px;
`;

const Value = styled.div`
  font-size: 30px;
`;

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <Timer>Exam Ends...</Timer>;
  }

  return (
    <Timer>
      {parseInt(remainingTime / 60) > 0 && (
        <>
          <Value>{parseInt(remainingTime / 60)}</Value>
          <Text>min</Text>
        </>
      )}
      <Value>{parseInt(remainingTime % 60)}</Value>
      <Text>sec</Text>
    </Timer>
  );
};

const CountDownTimer = ({ hoursMinSecs, url }) => {
  const navigate = useNavigate();
  const time = hoursMinSecs.minutes;

  return (
    <TimerWrapper>
      <CountdownCircleTimer
        isPlaying
        duration={hoursMinSecs.minutes * 60}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[time * 60, time * 40, time * 20, time * 0]}
        size={180}
        onComplete={() => navigate(url)}
      >
        {renderTime}
      </CountdownCircleTimer>
    </TimerWrapper>
  );
};

export default CountDownTimer;
