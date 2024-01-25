import React from "react";
import styles from "./success.module.css";
function Success({ handleSuccessModal, quizLink }) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.close}>
          <button onClick={() => handleSuccessModal(false)}>X</button>
        </div>
        <h1>
          Congrats your Quiz is
          <br /> Published!
        </h1>
        <div className={styles.link}>{quizLink}</div>
        <button className={styles.share}>Share</button>
      </div>
    </>
  );
}

export default Success;
