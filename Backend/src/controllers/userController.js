import bcrypt from 'bcrypt';
import {db} from "../db.js";

// REQUISIÇÃO DE USUÁRIOS.
export const getUsers = (_, res) => {
    const q = "SELECT id, username, email FROM users";
    db.query(q, (err, data) => {
        if (err) {
            console.log(JSON.stringify(err));
            return res.status(500).json(err.code);
        }
        if (data.length === 0) return res.status(204).json("Não há usuários cadastrados");
        return res.status(200).json(data);
    });
};

// REQUISIÇÃO DE USUÁRIOS POR ID
export const getUsersById = (req, res) => {
    const q = "SELECT id, username, email FROM users WHERE `id` = ?";
    db.query(q, [req.params.id], (err, data) => {
        if (err) {
            console.log(JSON.stringify(err));
            return res.status(500).json(err.code);
        }
        if (data.length === 0) return res.status(404).json("Usuário não encontrado");
        return res.status(200).json(data);
    });
};

// REQUISIÇÃO DE USUÁRIOS POR EMAIL OU USERNAME
export const getUsersBySearch = (req, res) => {
    const { search } = req.params;
    if (!search) { return res.status(400).json("Parâmetro de busca é obrigatório"); }
    const q = "SELECT id, username, email FROM users WHERE LOWER(username) LIKE LOWER(?) OR LOWER(email) LIKE LOWER(?)";
    const searchPattern = `%${search}%`;
    db.query(q, [searchPattern, searchPattern], (err, data) => {
        if (err) {
            console.log(JSON.stringify(err));
            return res.status(500).json(err.code);
        }
        if (data.length === 0) return res.status(404).json({message: "Nenhum usuário encontrado"});
        return res.status(200).json(data);
    });
};

// ADICIONAR NOVO USUÁRIO.
export const addUser = async  (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const q = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)";
    const values = [ req.body.username, req.body.email, hashedPassword ];
    db.query(q, [values], (err) => {
        if (err) { 
            console.log(JSON.stringify(err));
            if (err.code === 'ER_DUP_ENTRY') { 
                return res.status(400).json("Usuário já cadastrado");
            }
            return res.status(500).json(err.code);
        }
        return res.status(201).json("Usuário criado com sucesso");
    });
};

// LOGIN DE USUÁRIO
export const loginUser = (req, res) => {
  const { email, password } = req.body;
  const q = "SELECT * FROM users WHERE email = ?";
  db.query(q, [email], async (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json("Erro interno do servidor");
    }
    if (result.length === 0) return res.status(401).json("Usuário não encontrado");
    const user = result[0];
    // COMPARAR SENHA COM O HASH
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json("Senha incorreta");
    // NÃO RETORNAR A SENHA NA RESPOSTA
    const { password: _, ...userWithoutPassword } = user;
    return res.status(200).json(userWithoutPassword);
  });
};

// ATUALIZAR USUÁRIO EXISTENTE.
export const updateUser = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const q = "UPDATE users SET `username` = ?, `email` = ?, `password` = ? WHERE `id` = ?";
    const values = [ req.body.username, req.body.email, hashedPassword ];
    db.query(q, [...values, req.params.id], (err, result) => {
        if (err) {
            console.log(JSON.stringify(err));
            return res.status(500).json(err.code);
        }
        if (result.affectedRows === 0) return res.status(404).json("Usuário não encontrado");
        return res.status(200).json("Usuário atualizado com sucesso");
    });
};

// EXCLUIR USUÁRIO EXISTENTE.
export const deleteUser = (req, res) => {
    const q = "DELETE FROM users WHERE `id` = (?)";
    db.query(q, [req.params.id], (err, result) => {
        if (err) {
            console.log(JSON.stringify(err));
            return res.status(500).json(err.code);
        }
        if (result.affectedRows === 0) return res.status(404).json("Usuário não encontrado");
        return res.status(200).json("Usuário deletado com sucesso");
    });
};