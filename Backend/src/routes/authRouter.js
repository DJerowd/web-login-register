import express from "express";
import { registerUser, loginUser, getCurrentUser, refreshToken } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { validateBody, userSchema } from "../middlewares/validationMiddleware.js";

const router = express.Router();

// Rotas que não requerem autenticação
router.post("/", validateBody(userSchema, true), registerUser);
router.post("/login", loginUser);

// Rotas que requerem autenticação
router.get("/me", verifyToken, getCurrentUser);
router.get("/refresh", verifyToken, refreshToken);

export default router;