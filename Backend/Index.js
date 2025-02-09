import express from "express";
import cors from "cors";

import userRoutes from './src/routes/userRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRoutes)

app.listen(8800);