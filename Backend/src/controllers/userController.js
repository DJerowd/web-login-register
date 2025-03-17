import {db} from "../db.js";

// REQUISIÇÃO DE USUÁRIOS
export const getUsers = (_, res) => {
    const q = "SELECT * FROM users";
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("Nenhum usuário encontrado");
        return res.status(200).json(data);
    });
};

// REQUISIÇÃO DE USUÁRIOS POR ID
export const getUsersById = (req, res) => {
    const q = "SELECT * FROM users WHERE `id` = ?";
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("Usuário não encontrado!");
        return res.status(200).json(data);
    });
};

// REQUISIÇÃO DE USUÁRIOS POR EMAIL OU USERNAME
export const getUsersBySearch = (req, res) => {
    const { search } = req.params;
    if (!search) { return res.status(400).json("Parâmetro de busca é obrigatório"); }
    const q = "SELECT * FROM users WHERE LOWER(username) LIKE LOWER(?) OR LOWER(email) LIKE LOWER(?)";
    const searchPattern = `%${search}%`;
    db.query(q, [searchPattern, searchPattern], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("Nenhum usuário encontrado");
        return res.status(200).json(data);
    });
};

// ADICIONAR NOVO USUÁRIO
export const addUser = (req, res) => {
    const q = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)";
    const values = [ req.body.username, req.body.email, req.body.password ];
    db.query(q, [values], (err) => {
        if (err) return res.status(500).json(err);
        // if (err.code === 'ER_DUP_ENTRY') return res.status(400).json("Email já cadastrado!");
        return res.status(201).json("Usuário com o email: " + req.body.email + ", criado com sucesso!");
    });
};

// ATUALIZAR USUÁRIO EXISTENTE
export const updateUser = (req, res) => {
    const q = "UPDATE users SET `username` = ?, `email` = ?, `password` = ? WHERE `id` = ?";
    const values = [ req.body.username, req.body.email, req.body.password ];
    db.query(q, [...values, req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        // if (err.code === 'ER_DUP_ENTRY') return res.status(400).json("Email já cadastrado!");
        if (result.affectedRows === 0) return res.status(404).json("Usuário não encontrado!");
        return res.status(200).json("Usuário com o email: " + req.body.email + ", atualizado com sucesso!");
    });
};

// EXCLUIR USUÁRIO EXISTENTE
export const deleteUser = (req, res) => {
    const q = "DELETE FROM users WHERE `id` = (?)";
    db.query(q, [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.affectedRows === 0) return res.status(404).json("Usuário não encontrado!");
        return res.status(200).json("Usuário excluído com sucesso!");
    });
};