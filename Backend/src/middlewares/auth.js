import jwt from "jsonwebtoken";

const JWT_SECRET = "SECRET";

// MIDDLEWARE DE VERIFICAÇÃO DE AUTENTICAÇÃO
export const auth = async (req, res, next) => {
    const token = req.headers.authorization
    if (!token) return res.status(401).json({ message: "Faça login para acessar"})
    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET)
        const { iat: _, exp: __, ...decodedUser } = decoded;
    } catch (err) {
        return res.status(401).json({ message: "Acesso inválido"})
    }
    next()
}