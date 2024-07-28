import express from "express";
import {
  googleLoginCtrl,
  loginCtrl,
  logoutCtrl,
  registerCtrl,
} from "../controllers/authCtrl.js";
const authRouter = express.Router();
authRouter.post("/register", registerCtrl);
authRouter.post("/login", loginCtrl);
authRouter.post("/logout", logoutCtrl);
authRouter.post("/google-login", googleLoginCtrl);

export default authRouter;
