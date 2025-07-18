import express from "express";
import { registerUser, loginUser, validateToken } from "../controllers/authController.js";
import { validateUser } from "../middlewares/validateUser.js";

const router = express.Router();

router.post("/", validateUser, registerUser);
router.post("/login", loginUser);
router.post('/validate', validateToken);

export default router;