import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
const API_BASE = process.env.API_ENDPOINT || "/api/v1";
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: true,
    maxAge: 3600,
  })
);
app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, async () => {
  console.log(`"Server is running on http://localhost:${PORT}"`);
});
