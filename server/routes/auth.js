import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import middleware from "../middleware/middleware.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    const user = await User.findOne({ email }); // finding user with the unique parameter - email
    if (user) {
      return res
        .status(401)
        .json({ success: false, message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10); // use bcrypt to hash the password while saving it to the DB

    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });

    const token = jwt.sign({ id: newUser._id }, "uniqueKeyNotes1", {
      expiresIn: "12h",
    });
    await newUser.save();

    return res.status(200).json({
      success: true,
      token,
      user: { name: newUser.name, email: newUser.email },
      message: "User account created sucessfully!",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error in creating account" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const user = await User.findOne({ email }); // check user details by email, if it exists
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User doesn't exist" });
    }

    const checkPassword = await bcrypt.compare(password, user.password); // compare the passwords the user entered from the FE and the one stored in the DB

    if (!checkPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials! Try again..." });
    }

    const token = jwt.sign({ id: user._id }, "uniqueKeyNotes1", {
      expiresIn: "12h",
    });
    // token is created once a user is logged in, it takes the id, a secret key and the validity of the token

    return res.status(200).json({
      success: true,
      token,
      user: { name: user.name },
      message: "User logged in successfully!",
    });
    // we will give the token in the response as well.
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error in logging in" });
  }
});

router.post("/logout", async (req, res) => {
  try {
    return res
      .status(200)
      .json({ success: true, message: "User logged out successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error while loggin out" });
  }
});

router.get("/verify", middleware, async (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
});

export default router;
