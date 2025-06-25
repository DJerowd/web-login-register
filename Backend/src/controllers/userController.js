import {db} from "../db.js";
import bcrypt from 'bcrypt';

// REQUISIÇÃO DE USUÁRIOS.
export const getUsers = (_, res) => {
    const q = "SELECT id, username, email FROM users";
    db.query(q, (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Erro interno no servidor" });
        }
        if (data.length === 0) return res.status(204).json({ message: "Não há usuários cadastrados" });
        return res.status(200).json(data);
    });
};

// REQUISIÇÃO DE USUÁRIOS POR ID
export const getUsersById = (req, res) => {
    const q = "SELECT id, username, email FROM users WHERE `id` = ?";
    db.query(q, [req.params.id], (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Erro interno no servidor" });
        }
        if (data.length === 0) return res.status(404).json({ message: "Usuário não encontrado" });
        return res.status(200).json(data[0]);
    });
};

// REQUISIÇÃO DE USUÁRIOS POR EMAIL OU USERNAME
export const getUsersBySearch = (req, res) => {
    const { search } = req.params;
    if (!search) { return res.status(400).json({ message: "Parâmetro de busca é obrigatório" }); }
    const q = "SELECT id, username, email FROM users WHERE LOWER(username) LIKE LOWER(?) OR LOWER(email) LIKE LOWER(?)";
    const searchPattern = `%${search}%`;
    db.query(q, [searchPattern, searchPattern], (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Erro interno no servidor" });
        }
        if (data.length === 0) return res.status(404).json({ message: "Nenhum usuário encontrado" });
        return res.status(200).json(data);
    });
};

// ATUALIZAR USUÁRIO EXISTENTE.
export const updateUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const q = "UPDATE users SET `username` = ?, `email` = ?, `password` = ? WHERE `id` = ?";
        const values = [ username, email, hashedPassword ];
        db.query(q, [...values, req.params.id], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ message: "Usuário já cadastrado" });
                return res.status(500).json({ message: "Erro interno no servidor" });
            }
            if (result.affectedRows === 0) return res.status(404).json({ message: "Usuário não encontrado" });
            return res.status(200).json({ message: "Usuário atualizado com sucesso" });
        });
    } catch (error) {
        return res.status(500).json({ message: "Erro interno no servidor" });
    }
};

// EXCLUIR USUÁRIO EXISTENTE.
export const deleteUser = (req, res) => {
    const q = "DELETE FROM users WHERE `id` = (?)";
    db.query(q, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Erro interno no servidor" });
        }
        if (result.affectedRows === 0) return res.status(404).json({ message: "Usuário não encontrado" });
        return res.status(200).json({ message: "Usuário deletado com sucesso" });
    });
};