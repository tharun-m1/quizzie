import React, { useState } from "react";
import styles from "./deletequiz.module.css";
import axios from "axios";
import { backendBaseUrl } from "../../constants";
import Loading from "../Loading/Loading";
export default function DeleteQuiz({ handleDeleteQuiz, quizId }) {
  const [loading, setLoading] = useState(false);
  const handleDelete = () => {
    // console.log(quizId);
    const quizzId = quizId;
    // console.log(quizzId);
    const jwToken = localStorage.getItem("jwToken");
    if (!jwToken) {
      // setLoading(false);
      return alert("Your are not logged in");
    }
    const headers = {
      "Content-Type": "application/json",
      authorization: jwToken,
    };
    setLoading(true);
    axios
      .delete(`${backendBaseUrl}/delete-quizz/${quizzId}`, { headers: headers })
      .then((res) => {
        if (res.data.status === "OK") {
          setLoading(false);
          handleDeleteQuiz(false);
          window.location.reload();
          return alert("Quiz Deleted");
        }
      })
      .catch((err) => {
        setLoading(false);
        return alert("Something went wrong");
      });
  };
  return (
    <>
      <div className={styles.container}>
        {loading ? <Loading /> : ""}
        <h1>
          Are you confirm you <br /> want to delete ?
        </h1>
        <div className={styles.buttons}>
          <button onClick={handleDelete} className={styles.confirm}>
            Confirm Delete
          </button>
          <button
            onClick={() => handleDeleteQuiz(false)}
            className={styles.cancle}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
