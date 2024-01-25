const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Admin = require("../models/admin");
const errorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const isLoggedIn = require("../middleware/isLoggedIn");
const verify = require("../middleware/verify");
require("dotenv").config();
// ================Sign Up========================================

router.post("/signup", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    await Admin.create({
      name,
      email,
      password: encryptedPassword,
    });
    return res.status(200).json({
      status: "OK",
      message: "User created successfully...",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// ================================================================

// ====================== LogIn ====================================

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return next(errorHandler(404, "User Not Found."));
    }
    const passwordMatched = await bcrypt.compare(password, admin.password);
    if (!passwordMatched) {
      return next(errorHandler(401, "Incorrect Credentials."));
    }
    const payload = {
      adminId: admin._id,
    };
    const jwToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: 60 * 60,
    });
    return res.status(200).json({
      status: "OK",
      message: "Successfully LoggedIn",
      jwToken,
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
});

// =================================================================
// =========================== Verify ==============================
router.post("/verify", verify, async (req, res, next) => {
  return res.status(200).json({
    status: "OK",
    adminId: req.adminId,
  });
});

module.exports = router;
