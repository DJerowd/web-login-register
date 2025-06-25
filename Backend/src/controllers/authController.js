import {db} from "../db.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

// ADICIONAR NOVO USUÁRIO.
export const registerUser = async  (req, res) => {
  const { username, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const emailLowcase = await email.toLowerCase();
    const hashedPassword = await bcrypt.hash(password, salt);
    const q = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)";
    const values = [ username, emailLowcase, hashedPassword ];
    db.query(q, [values], (err) => {
      if (err) { 
            if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ message: "Usuário já cadastrado" });
            return res.status(500).json({ message: "Erro interno no servidor" });
        }
        return res.status(201).json({ message: "Usuário criado com sucesso" });
    });
  } catch (error) {
      return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

// LOGIN DE USUÁRIO
export const loginUser = (req, res) => {
  const { email, password } = req.body;
  const q = "SELECT id, username, email, password FROM users WHERE email = ?";
  try {
    const emailLowcase = email.toLowerCase();
  db.query(q, [emailLowcase], async (err, result) => {
    if (err) return res.status(500).json({ message: "Erro interno do servidor" });
    if (result.length === 0) return res.status(401).json({ message: "A senha ou email do usuário incorreta" });
    const user = result[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: "A senha ou email do usuário incorreta" });
    const { password: _, ...userWithoutPassword } = user;
    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: '60m' });
    return res.status(200).json({user: userWithoutPassword, token: token});
  });
  } catch (error) {
      return res.status(500).json({ message: "Erro interno no servidor" });
  }
};