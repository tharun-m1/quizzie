import React, { useState, useEffect } from "react";
import styles from "./analytics.module.css";
import edit from "../../assets/edit.png";
import del from "../../assets/del.png";
import share from "../../assets/share.png";
import axios from "axios";
import { backendBaseUrl } from "../../constants";
function Analytics() {
  const [quizArr, setQuizArr] = useState([]);
  async function getData() {
    try {
      const jwToken = localStorage.getItem("jwToken");
      const headers = {
        "Content-Type": "application/json",
        authorization: jwToken,
      };
      const response = await axios.get(`${backendBaseUrl}/quizs`, {
        headers: headers,
      });
      setQuizArr(response.data.data);
    } catch (err) {
      console.log(err);
      return alert("Something went wrong");
    }
  }
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>Quiz Analysis</div>
        <div className={styles.data}>
          <div className={styles.info}>
            <table>
              <tr>
                <th>S.No</th>
                <th>Quiz Name</th>
                <th>Created on</th>
                <th>Impressions</th>
                <th></th>
                <th></th>
              </tr>
              {quizArr.map((quiz, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{quiz.quizzName}</td>
                  <td> {quiz.createdOn} </td>
                  <td> {quiz.impressions} </td>
                  <td>
                    <img
                      style={{ cursor: "pointer", marginRight: "5px" }}
                      src={edit}
                      alt="edit"
                    />
                    <img
                      style={{ cursor: "pointer", marginRight: "5px" }}
                      src={del}
                      alt="delete"
                    />
                    <img
                      style={{ cursor: "pointer", marginRight: "5px" }}
                      src={share}
                      alt="share"
                    />
                  </td>
                  <td
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                  >
                    <span>Question Wise Analysis</span>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Analytics;
