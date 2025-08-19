import {db} from "../db.js";
import bcrypt from 'bcrypt';
import { sendSuccess, sendError } from "../middlewares/responseMiddleware.js";

export const getUsers = (req, res) => {
    const { page = 1, limit = 10, username } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    let filters = "1=1";
    let values = [];
    if (username) {
        filters += " AND username LIKE ?";
        values.push(`%${username}%`);
    }
    const countQuery = `SELECT COUNT(*) as total FROM users WHERE ${filters}`;
    db.query(countQuery, values, (err, countResult) => {
        if (err) return sendError(res, "Erro interno no servidor", 500);
        const total = countResult[0].total;
        if (total === 0) return sendError(res, "Nenhum usuário encontrado", 404);
        const totalPages = Math.ceil(total / parseInt(limit));
        const dataQuery = `SELECT id, username, email FROM users WHERE ${filters} LIMIT ? OFFSET ?`;
        db.query(dataQuery, [...values, parseInt(limit), offset], (err, data) => {
            if (err) return sendError(res, "Erro interno no servidor", 500);
            return sendSuccess(res, "Usuários encontrados", {
                users: data,
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                totalPages
            });
        });
    });
};

export const getUsersById = (req, res) => {
    const userId = req.params.id;
    const q = "SELECT id, username, email FROM users WHERE id = ?";
    db.query(q, [userId], (err, data) => {
        if (err) return sendError(res, "Erro interno no servidor", 500);
        if (data.length === 0) return sendError(res, "Usuário não encontrado", 404);
        return sendSuccess(res, "Usuário encontrado", data[0]);
    });
};

export const getUsersBySearch = (req, res) => {
    const { page = 1, limit = 10, search } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    let filters = "1=1";
    let values = [];
    if (search) {
        filters += " AND (LOWER(username) LIKE LOWER(?) OR LOWER(email) LIKE LOWER(?))";
        values.push(`%${search}%`);
        values.push(`%${search}%`);
    }
    const countQuery = `SELECT COUNT(*) as total FROM users WHERE ${filters}`;
    db.query(countQuery, values, (err, countResult) => {
        if (err) return sendError(res, "Erro interno no servidor", 500);
        const total = countResult[0].total;
        if (total === 0) return sendError(res, "Nenhum usuário encontrado", 404);
        const totalPages = Math.ceil(total / parseInt(limit));
        const dataQuery = `SELECT id, username, email FROM users WHERE ${filters} LIMIT ? OFFSET ?`;
        db.query(dataQuery, [...values, parseInt(limit), offset], (err, data) => {
            if (err) return sendError(res, "Erro interno no servidor", 500);
            return sendSuccess(res, "Usuários encontrados", {
                users: data,
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                totalPages
            });
        });
    });
};

export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { username, email, password } = req.body;
    if (!username || !email || !password) return sendError(res, "Campos obrigatórios: username, email, password", 400);
    try {
        const salt = await bcrypt.genSalt(10);
        const checkEmailQuery = "SELECT id FROM users WHERE email = ? AND id != ?";
        db.query(checkEmailQuery, [email, userId], (err, data) => {
            if (err) return sendError(res, "Erro interno no servidor", 500);
            if (data.length > 0) return sendError(res, "Email já cadastrado", 400);
            if (password) {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) return sendError(res, "Erro interno no servidor", 500);
                    const q = "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?";
                    const values = [username, email, hash, userId];
                    db.query(q, values, (err, data) => {
                        if (err) return sendError(res, "Erro interno no servidor", 500);
                        if (data.affectedRows === 0) return sendError(res, "Usuário não encontrado", 404);
                        return sendSuccess(res, "Usuário atualizado com sucesso");
                    });
                });
            } else {
                const q = "UPDATE users SET username = ?, email = ? WHERE id = ?";
                const values = [username, email, userId];
                db.query(q, values, (err, data) => {
                    if (err) return sendError(res, "Erro interno no servidor", 500);
                    if (data.affectedRows === 0) return sendError(res, "Usuário não encontrado", 404);
                    return sendSuccess(res, "Usuário atualizado com sucesso");
                });
            }
        });
    } catch (error) {
        return sendError(res, "Erro interno no servidor", 500);
    }
};

export const deleteUser = (req, res) => {
    const userId = req.params.id;
    const q = "DELETE FROM users WHERE id = ?";
    db.query(q, [userId], (err, data) => {
        if (err) return sendError(res, "Erro interno no servidor", 500);
        if (data.affectedRows === 0) return sendError(res, "Usuário não encontrado", 404);
        return sendSuccess(res, "Usuário deletado com sucesso");
    });
};