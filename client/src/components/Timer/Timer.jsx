import React, { useEffect, useRef, useState } from "react";

function Timer({ nextQuestion, arrlen, handleSubmit, seconds }) {
  const sec = 5;
  // console.log(sec);
  const [countdown, setCountdown] = useState(sec);
  const intervalId = useRef();
  useEffect(() => {
    intervalId.current = setInterval(() => {
      setCountdown((countdown) => countdown - 1);
    }, 1000);

    return () => clearInterval(intervalId.current);
  }, []);

  useEffect(() => {
    // console.log(arrlen);
    if (countdown <= 0) {
      clearInterval(intervalId.current);
      nextQuestion();
      setCountdown(() => sec);
      const currIdx = localStorage.getItem("currIdx") - "0";
      intervalId.current = setInterval(() => {
        setCountdown((countdown) => {
          return countdown - 1;
        });
      }, 1000);
    }
  }, [countdown]);

  return <div>{`00:${countdown < 10 ? `0${countdown}` : countdown}`}</div>;
}

export default Timer;
