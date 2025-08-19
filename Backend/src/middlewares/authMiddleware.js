import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Token de acesso não fornecido" });
    const token = authHeader.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: "Token de acesso não fornecido" });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (error) {
        if (error.name === "TokenExpiredError") return res.status(401).json({ message: "Token expirado" });
        if (error.name === "JsonWebTokenError") return res.status(401).json({ message: "Token inválido" });
        return res.status(500).json({ message: "Erro interno no servidor" });
    }
    next();
};

export const verifyOwnership = (req, res, next) => {
    const userId = req.user.id;
    const resourceUserId = req.params.id || req.body.userId;
    if (userId != resourceUserId) return res.status(403).json({ message: "Acesso negado: você não tem permissão para acessar este recurso" });
    next();
};