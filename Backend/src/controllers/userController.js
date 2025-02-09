import {db} from "../db.js";

// REQUISIÇÃO DE USUÁRIOS.
export const getUsers = (_, res) => {
    const q = "SELECT * FROM users";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

// ADICIONAR NOVO USUÁRIO.
export const addUser = (req, res) => {
    const q = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)";

    const values = [
        req.body.username,
        req.body.email,
        req.body.password,
    ];

    db.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuário criado com sucesso!");
    });
};

// ATUALIZAR USUÁRIO EXISTENTE.
export const updateUser = (req, res) => {
    const q = "UPDATE users SET `username` = ?, `email` = ?, `password` = ? WHERE `id` = ?";

    const values = [
        req.body.username,
        req.body.email,
        req.body.password,
    ];

    db.query(q, [...values, req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuário atualizado com sucesso!");
    });
};

// EXCLUIR USUÁRIO EXISTENTE.
export const deleteUser = (req, res) => {
    const q = "DELETE FROM users WHERE `id` = (?)";

    db.query(q, [req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuário deletado com sucesso!");
    });
};