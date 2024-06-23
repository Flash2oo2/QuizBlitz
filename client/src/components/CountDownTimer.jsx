// import React from 'react'

// const CountDownTimer = ({hoursMinSecs}) => {

//     const { hours = 0, minutes = 0, seconds = 60 } = hoursMinSecs;
//     const [[hrs, mins, secs], setTime] = React.useState([hours, minutes, seconds]);


//     const tick = () => {

//         if (hrs === 0 && mins === 0 && secs === 0) 
//             reset()
//         else if (mins === 0 && secs === 0) {
//             setTime([hrs - 1, 59, 59]);
//         } else if (secs === 0) {
//             setTime([hrs, mins - 1, 59]);
//         } else {
//             setTime([hrs, mins, secs - 1]);
//         }
//     };


//     const reset = () => setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);


//     React.useEffect(() => {
//         const timerId = setInterval(() => tick(), 1000);
//         return () => clearInterval(timerId);
//     });


//     return (
//         <div>
//             <p>{`${hrs.toString().padStart(2, '0')}:${mins
//             .toString()
//             .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}</p> 
//         </div>
//     );
// }

// export default CountDownTimer;

import React, { useState } from "react";
import ReactDOM from "react-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// import "./styles.css";

const Timerwrapper = styled.div`
    display: flex;
    justify-content: right;
    margin : 25px;  
      
`;

const Timer = styled.div`
    font-family: "Montserrat";
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Text = styled.div`
  color: #aaa;
  font-size : 20px;
`;

const Value = styled.div`
    font-size: 30px;
`;



const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
        return <Timer>Exam Ends...</Timer>;
    }

    return (
        <>

            <Timer>
                {parseInt(remainingTime / 60) > 0 && (<>
                    <Value>{parseInt(remainingTime / 60)}</Value>
                    <Text>min :  </Text>
                </>
                )
                }
                <Value>{parseInt(remainingTime % 60)}</Value>
                <Text>sec</Text>
            </Timer>

            {/* <Text>Time Left</Text> */}
        </>
    );
};

const CountDownTimer = ({ hoursMinSecs, url }) => {


    const navigate = useNavigate();
    const time = hoursMinSecs.minutes;



    // console.log(exam_id);
    console.log(url);

    return (

        <Timerwrapper >
            <CountdownCircleTimer
                isPlaying
                duration={hoursMinSecs.minutes * 60}
                colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                colorsTime={[time * 60, time * 40, time * 20, time * 0]}
                size={180}
                onComplete={() => (navigate(url))}
            >
                {renderTime}
            </CountdownCircleTimer>

        </Timerwrapper>


    );
}
export default CountDownTimer;

