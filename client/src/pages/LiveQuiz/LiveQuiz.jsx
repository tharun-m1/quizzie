import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./livequiz.module.css";
import { backendBaseUrl } from "../../constants";
import axios from "axios";
function LiveQuiz() {
  const [qArr, setQArr] = useState(null);
  const [quizName, setQuizName] = useState(null);
  const [quizType, setQuizType] = useState(null);
  const [timer, setTimer] = useState(null);
  const { quizId } = useParams();
  const getQuestions = async () => {
    try {
      const quizzId = quizId;
      const res = await axios.get(`${backendBaseUrl}/quizz/${quizzId}`);
      setQArr(res.data.data.questions);
      setQuizName(res.data.data.quizName);
      setQuizType(res.data.data.quizType);
      setTimer(res.data.data.timer);
    } catch (err) {
      console.log(err);
      return alert("something went wrong in getting questions");
    }
  };
  useEffect(() => {
    getQuestions();
  }, []);
  return <div>{quizName ? quizName : "Loading..."}</div>;
}

export default LiveQuiz;
