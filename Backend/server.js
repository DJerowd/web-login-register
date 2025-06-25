import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from './src/routes/authRouter.js';
import userRouter from './src/routes/userRouter.js';


const server = express();
const port = 8800;

dotenv.config();

server.use(express.json());
server.use(cors());
server.use("/users", authRouter)
server.use("/users", userRouter)

server.listen(port, () => console.log(`Server running on port ${port}`));