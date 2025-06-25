import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { validateUser } from "../middlewares/validateUser.js";

const router = express.Router();

router.post("/", validateUser, registerUser);
router.post("/login", loginUser);

export default router;