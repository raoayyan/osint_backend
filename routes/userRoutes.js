const express = require("express");
const userRouter = express.Router();
const { loginUser, logoutUser,userRegistration } = require("../controllers/userController");

userRouter.post("/login", loginUser);
userRouter.post("/register",userRegistration)
userRouter.post("/logout", logoutUser);

module.exports = userRouter;