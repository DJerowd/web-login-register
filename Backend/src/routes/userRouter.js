import express from "express";
import { getUsers, getUsersById, getUsersBySearch, updateUser, deleteUser } from "../controllers/userController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", auth, getUsers);
router.get("/:id", auth, getUsersById);
router.get("/search/:search", auth, getUsersBySearch);
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);

export default router;