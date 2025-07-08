import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from './src/routes/authRouter.js';
import userRouter from './src/routes/userRouter.js';

const server = express();

dotenv.config();

server.use(express.json());
server.use(cors());
server.use("/users", authRouter);
server.use("/users", userRouter);

server.listen(process.env.SERVER_PORT, () => console.log(`Server running on port ${process.env.SERVER_PORT}`));