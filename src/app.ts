import express from "express";
import cors from "cors";
import userRouter from "./router/userRouter";
import editRouter from "./router/editRouter";
import tokenRouter from "./router/tokenRouter";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const port = 5000;

// DB Connect
mongoose
  .connect(
    `mongodb+srv://kimdev9612:${process.env.DBKEY}@cluster0.2mck3wn.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("MongoDB 연결완료");
  })
  .catch((err) => {
    console.log("MongoDB 연결 오류 : ", err);
  });

// CORS
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log("Request headers:", req.headers);
  console.log("Request body:", req.body);
  next();
});
// cookie-parser
app.use(cookieParser());

//router
app.use(userRouter);
app.use("/edit", editRouter);
app.use("/token", tokenRouter);

app.listen(port, () => {
  console.log("서버" + port + "에서 작동 중");
});
