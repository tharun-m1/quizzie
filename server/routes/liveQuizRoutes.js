const express = require("express");
const router = express.Router();
const Quizz = require("../models/quizz");
const errorHandler = require("../utils/errorHandler");
router.post("/:quizzId/submit", async (req, res, next) => {
  try {
    const { quizzId } = req.params;
    const resReceived = req.body;
    const quizDb = await Quizz.findOne({ _id: quizzId });
    if (!quizDb) {
      return next(errorHandler(404, "Quiz Not found"));
    }
    let score = 0;
    if (quizDb.quizzType === "qna") {
      const questionsArr = quizDb.questions;
      //   console.log(questionsArr);
      resReceived.forEach((q, index) => {
        const qId = q.questionId;
        const ansId = q.ansSelectedId;
        if (ansId) {
          const qFound = questionsArr.find((que) => {
            // console.log(que);
            return que._id.toString() === qId;
          });
          //   console.log(qFound);
          const optFound = qFound.options.find((op) => {
            return op._id.toString() === ansId.toString();
          });
          if (optFound.isAnswer) {
            score = score + 1;
            quizDb.questions[index].correct =
              quizDb.questions[index].correct + 1;
            quizDb.questions[index].attempted =
              quizDb.questions[index].attempted + 1;
          } else {
            quizDb.questions[index].attempted =
              quizDb.questions[index].attempted + 1;
            quizDb.questions[index].incorrect =
              quizDb.questions[index].incorrect + 1;
          }
        } else {
          quizDb.questions[index].incorrect =
            quizDb.questions[index].incorrect + 1;
        }
      });
      await quizDb.save();
      res.status(200).json({
        status: "OK",
        score: score,
      });
    } else {
      // poll logic
      resReceived.forEach((q, index) => {
        const qId = q.questionId;
        const ansId = q.ansSelectedId;
        // console.log(qId, ansId);
        if (ansId) {
          const ansIdx = quizDb.questions[index].options.findIndex((op) => {
            return op._id.toString() === ansId.toString();
          });
          // console.log(ansIdx);
          quizDb.questions[index].options[ansIdx].votes =
            quizDb.questions[index].options[ansIdx].votes + 1;
        }
      });
      await quizDb.save();
      res.status(200).json({
        status: "OK",
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;

/*
[
    {
        qId,
        selectedAnsId
    },
    {
        qId,
        selectedAnsId
    }
]
*/
