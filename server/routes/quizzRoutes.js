const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const Admin = require("../models/admin");
const Quizz = require("../models/quizz");
const errorHandler = require("../utils/errorHandler");
const router = express.Router();

// ====================== Create Quizz==============================
router.post("/create-quizz", isLoggedIn, async (req, res, next) => {
  try {
    const adminId = req.adminId;
    const quizzData = req.body;
    quizzData.adminId = adminId;
    const createdQuiz = await Quizz.create(quizzData);
    res.status(200).json({
      status: "OK",
      message: "Quizz Created Succesfully",
      quizId: createdQuiz._id,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});
// ===================================================================

// ========================= Delete Quizz ============================
router.delete("/delete-quizz/:quizzId", isLoggedIn, async (req, res, next) => {
  try {
    const radminId = req.adminId;
    const { quizzId } = req.params;
    // console.log("quizzId", quizzId);
    const query = {
      $and: [
        { adminId: { $eq: radminId } },
        { _id: { $eq: quizzId.toString() } },
      ],
    };
    const deletedQuizz = await Quizz.findOneAndDelete(query);
    if (!deletedQuizz) {
      return next(errorHandler(404, "Quizz not found"));
    }
    res.status(200).json({
      status: "OK",
      message: "Quizz Deleted",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});
// ===================================================================

// ====================== View Quizz =================================
router.get("/quizz/:quizzId", async (req, res, next) => {
  try {
    const { quizzId } = req.params;

    const quizz = await Quizz.findOne({ _id: quizzId });

    if (!quizz) {
      return next(errorHandler(404, "quizz Not Found"));
    }
    quizz.impressions = quizz.impressions + 1;
    await quizz.save();
    const questions = quizz.questions;
    const modifiedQuestions = [];
    questions.forEach((question) => {
      const modifiedOptions = [];
      question.options.forEach((op) => {
        const { isAnswer, ...rest } = op._doc;
        modifiedOptions.push(rest);
      });
      question.options = modifiedOptions;
      modifiedQuestions.push(question);
    });

    return res.status(200).json({
      status: "OK",
      data: modifiedQuestions,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});
// ==================================================================
// ========================== Update Quizz ==========================
router.put("/update-quizz/:quizzId", isLoggedIn, async (req, res, next) => {
  try {
    const { quizzId } = req.params;
    const modifiedQuizz = req.body;
    // console.log(modifiedQuizz);
    const radminId = req.adminId;
    const query = {
      $and: [{ adminId: { $eq: radminId } }, { _id: { $eq: quizzId } }],
    };
    // const updatedDoc = await Quizz.findOneAndUpdate(query, modifiedQuizz, {
    //   new: true,
    // });
    const quiz = await Quizz.findOne(query);
    if (!quiz) {
      return next(errorHandler(404, "Quizz Not Found"));
    }
    quiz.questions = modifiedQuizz;
    await quiz.save();
    return res.status(200).json({
      status: "OK",
      message: "Quizz Updated Succssfully",
      quizId: quizzId,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});
// =========================== All quizs =================================
router.get("/quizs", isLoggedIn, async (req, res, next) => {
  try {
    const adminId = req.adminId;
    const quizs = await Quizz.find({ adminId: adminId });
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    const data = quizs.map((quiz) => ({
      quizzName: quiz.quizzName,
      impressions: quiz.impressions,
      createdOn: quiz.createdAt.toLocaleDateString("en-US", options),
      questions: quiz.questions.length,
      quizzId: quiz._id,
    }));

    res.status(200).json({
      status: "OK",
      data: data,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});
// ===================================================================
// =======================Fetch for edit =============================
router.get("/fetch/:quizzId", isLoggedIn, async (req, res, next) => {
  try {
    const radminId = req.adminId;
    const { quizzId } = req.params;
    // console.log("quizzId", quizzId);
    const query = {
      $and: [
        { adminId: { $eq: radminId } },
        { _id: { $eq: quizzId.toString() } },
      ],
    };
    const quizzData = await Quizz.find(query);
    if (!quizzData) {
      return next(errorHandler(404, "Quiz Not Found"));
    }
    // console.log(quizzData[0].questions);
    res.status(200).json({
      status: "OK",
      quizData: quizzData,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});
module.exports = router;
