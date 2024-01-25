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
router.post("/delete-quizz/:quizzId", isLoggedIn, async (req, res, next) => {
  try {
    const radminId = req.adminId;
    const { quizzId } = req.params;
    const query = {
      $and: [{ adminId: { $eq: radminId } }, { _id: { $eq: quizzId } }],
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
// router.get("/quizz/:quizzId", isLoggedIn, async (req, res, next) => {
//   try {
//     const { quizzId } = req.params;
//     const adminId = req.adminId;
//     const admin = await Admin.findOne({ _id: adminId });
//     const quizz = admin.quizzes.find((q) => q._id.toString() === quizzId);
//     quizz.impressions = quizz.impressions + 1;
//     await admin.save();
//     if (!quizz) {
//       return next(errorHandler(404, "quizz Not Found"));
//     }
//     return res.status(200).json({
//       status: "OK",
//       data: quizz,
//     });
//   } catch (err) {
//     console.log(err);
//     next(err);
//   }
// });
// ==================================================================
// ========================== Update Quizz ==========================
router.put("/update-quizz/:quizzId", isLoggedIn, async (req, res, next) => {
  try {
    const { quizzId } = req.params;
    const modifiedQuizz = req.body;
    const radminId = req.adminId;
    const query = {
      $and: [{ adminId: { $eq: radminId } }, { _id: { $eq: quizzId } }],
    };
    const updatedDoc = await Quizz.findOneAndUpdate(query, modifiedQuizz, {
      new: true,
    });
    if (!updatedDoc) {
      return next(errorHandler(404, "Quizz Not Found"));
    }

    return res.status(200).json({
      status: "OK",
      message: "Quizz Updated Succssfully",
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
module.exports = router;
