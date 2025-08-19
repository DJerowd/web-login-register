import express from "express";
import { getUsers, getUsersById, getUsersBySearch, updateUser, deleteUser } from "../controllers/userController.js";
import { verifyToken, verifyOwnership } from "../middlewares/authMiddleware.js";
import { validateBody, userSchema } from "../middlewares/validationMiddleware.js";

const router = express.Router();
    
// Rotas que requerem autenticação
router.get("/", verifyToken, getUsers);
router.get("/:id", verifyToken, getUsersById);
router.get("/search/:search", verifyToken, getUsersBySearch);

// Rotas que requerem autenticação e verificação de propriedade
router.put("/:id", verifyToken, verifyOwnership, validateBody(userSchema, false), updateUser);
router.delete("/:id", verifyToken, verifyOwnership, deleteUser);

export default router;