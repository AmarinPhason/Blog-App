import express from "express";
import { registerCtrl } from "../controllers/authCtrl.js";
const authRouter = express.Router();
authRouter.post("/register", registerCtrl);

export default authRouter;
