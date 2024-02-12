import React, { useEffect, useRef, useState } from "react";

function Timer({ nextQuestion, arrlen, handleSubmit, timer, showQuestion }) {
  const sec = timer - "0";
  // console.log(sec);
  const [countdown, setCountdown] = useState(sec);
  const intervalId = useRef();
  const isLast = useRef(false);
  useEffect(() => {
    intervalId.current = setInterval(() => {
      setCountdown((countdown) => countdown - 1);
    }, 1000);
    if (arrlen === 1) {
      isLast.current = true;
    }
    return () => clearInterval(intervalId.current);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      clearInterval(intervalId.current);
      nextQuestion();
      console.log(showQuestion);
      if (showQuestion < arrlen && isLast.current === false) {
        if (showQuestion === arrlen - 2) {
          isLast.current = true;
        }
        setCountdown(() => sec);
        intervalId.current = setInterval(() => {
          setCountdown((countdown) => {
            return countdown - 1;
          });
        }, 1000);
      } else {
        clearInterval(intervalId.current);
        handleSubmit();
      }
    }
    // eslint-disable-next-line
  }, [countdown]);

  useEffect(() => {
    setCountdown(sec);
    if (showQuestion === arrlen - 2) {
      isLast.current = true;
    }
    // eslint-disable-next-line
  }, [showQuestion]);

  return <div>{`00:${countdown < 10 ? `0${countdown}` : countdown}`}</div>;
}

export default Timer;
