import jwt from "jsonwebtoken";

// MIDDLEWARE DE VERIFICAÇÃO DE AUTENTICAÇÃO
export const auth = async (req, res, next) => {
    const token = req.headers.authorization
    if (!token) return res.status(401).json({ message: "Faça login para acessar"})
    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET)
        const { iat: _, exp: __, ...decodedUser } = decoded;
    } catch (err) {
        return res.status(401).json({ message: "Faça login para acessar"})
    }
    next()
}