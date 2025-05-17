import express from "express";
import cors from "cors";

import userRouter from './src/routes/userRouter.js';

const server = express();

server.use(express.json());
server.use(cors());
server.use("/users", userRouter)

server.listen(8800, () => console.log(`Servidor rodando na porta 8800`));