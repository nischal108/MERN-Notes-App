const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const router = express.Router();
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const userValidation = require("../middlewares/userValidation");

const signupSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    signupSchema.parse({ fullName, email, password });
  } catch (error) {
    return res.status(400).json({ message: "Invalid input", error: true });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      message: "Email already used",
      error: true,
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { userId: createdUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(201).json({
      message: "user created successfully",
      token,
    });
  } catch (error) {
    console.error("error while logging in ", error);
    res.status(500).json({
      message: "internal server error",
      error: "true",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(400).json({
        message: "email or password is wrong",
        error: true,
      });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      res.status(400).json({
        message: "email or password is wrong",
        error: true,
      });
    }

    //generate tokens

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(200).json({
      message: "user logged in successfully",
      token,
    });
  } catch (error) {
    console.error("Error while logging in:", error);
    res.status(500).json({
      message: "Internal server error",
      error: true,
    });
  }
});

router.get("/loggedInUserInfo", userValidation, async (req, res) => {
  const userId = req.userId;

  try {
    const loggedInUser = await User.findOne({ _id: userId });
    if (!loggedInUser) {
      return res.status(404).json({
        message: "User not found",
        error: true,
      });
    }

    res.status(200).json({
      fullName: loggedInUser.fullName,
      email: loggedInUser.email,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      error: true,
    });
  }
});


module.exports= router;