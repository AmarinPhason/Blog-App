import express from "express";
import { registerCtrl } from "../controllers/authCtrl.js";
const authRouter = express.Router();
authRouter.get("/register", registerCtrl);

export default authRouter;
