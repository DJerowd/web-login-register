import {db} from "../db.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { sendSuccess, sendError } from "../middlewares/responseMiddleware.js";

export const registerUser = async  (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return sendError(res, "Campos obrigatórios: username, email, password", 400);
  try {
    const salt = await bcrypt.genSalt(10);
    const emailLowcase = await email.toLowerCase();
    const checkEmailQuery = "SELECT id FROM users WHERE email = ?";
    db.query(checkEmailQuery, [emailLowcase], (err, data) => {
      if (err) return sendError(res, "Erro interno no servidor", 500);
      if (data.length > 0) return sendError(res, "Email já cadastrado", 400);
    });
    bcrypt.hash(password, salt, (err, hash) => {
      if (err)  return sendError(res, "Erro interno no servidor", 500);
      const q = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
      const values = [username, emailLowcase, hash];
      db.query(q, values, (err, data) => {
          if (err) return sendError(res, "Erro interno no servidor", 500);
          return sendSuccess(res, "Usuário criado com sucesso", { id: data.insertId, username, email }, 201);
      });
    });
  } catch (error) {
      sendError(res, "Erro interno no servidor", 500);
  }
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return sendError(res, "Campos obrigatórios: email, password", 400);
  const q = "SELECT id, username, email, password FROM users WHERE email = ?";
  try {
    const emailLowcase = email.toLowerCase();
    db.query(q, [emailLowcase], async (err, data) => {
      if (err) sendError(res, "Erro interno no servidor", 500);
      if (data.length === 0) return sendError(res, "Email ou senha incorretos", 401);
      const user = data[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return sendError(res, "Erro interno no servidor", 500);
        if (!isMatch) return sendError(res, "Email ou senha incorretos", 401);
        const token = jwt.sign(
          { id: user.id, email: user.email, username: user.username },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );
        return sendSuccess(res, "Login realizado com sucesso", {
          user: { id: user.id, username: user.username, email: user.email },
          token
        });
      });
    });
  } catch (error) {
      sendError(res, "Erro interno no servidor", 500);
  }
};

export const getCurrentUser = (req, res) => {
  const userId = req.user.id;
  const q = "SELECT id, username, email FROM users WHERE id = ?";
  db.query(q, [userId], (err, data) => {
      if (err) return sendError(res, "Erro interno no servidor", 500);
      if (data.length === 0) return sendError(res, "Usuário não encontrado", 404);
      return sendSuccess(res, "Usuário encontrado", data[0]);
  });
};

export const refreshToken = (req, res) => {
  const userId = req.user.id;
  const q = "SELECT id, username, email FROM users WHERE id = ?";
  db.query(q, [userId], (err, data) => {
      if (err) return sendError(res, "Erro interno no servidor", 500);
      if (data.length === 0) return sendError(res, "Usuário não encontrado", 404);
      const user = data[0];
      const token = jwt.sign(
          { id: user.id, email: user.email, username: user.username },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
      );
      return sendSuccess(res, "Token renovado com sucesso", {
          user: { id: user.id, username: user.username, email: user.email },
          token
      });
  });
};