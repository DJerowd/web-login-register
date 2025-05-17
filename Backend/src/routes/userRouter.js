import express from "express";
import { getUsers, getUsersById, getUsersBySearch, addUser, loginUser, updateUser, deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);

router.get("/:id", getUsersById);

router.get("/search/:search", getUsersBySearch);

router.post("/", addUser);

router.post("/login", loginUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;