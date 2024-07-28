import express from "express";
import {
  googleLoginCtrl,
  loginCtrl,
  registerCtrl,
} from "../controllers/authCtrl.js";
const authRouter = express.Router();
authRouter.post("/register", registerCtrl);
authRouter.post("/login", loginCtrl);
authRouter.post("/google-login", googleLoginCtrl);

export default authRouter;
