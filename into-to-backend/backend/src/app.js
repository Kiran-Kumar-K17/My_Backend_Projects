import express from "express";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";

const app = express(); // created an express app

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

//example:- http://localhost:4000/api/v1/users/register

export default app;
