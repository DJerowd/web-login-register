// Middleware para padronizar respostas de sucesso
export function sendSuccess(res, message, data = null, status = 200) {
    return res.status(status).json({
        success: true,
        message,
        data
    });
}

// Middleware para padronizar respostas de erro
export function sendError(res, message, status = 400, details = null) {
    const response = {
        success: false,
        message
    };
    if (details) response.details = details;
    return res.status(status).json(response);
}

// Middleware global para capturar erros não tratados
export function errorHandler(err, req, res, next) {
    if (res.headersSent) return next(err);
    return res.status(500).json({
        success: false,
        message: "Erro interno no servidor",
        details: process.env.NODE_ENV === "development" ? err.stack : undefined
    });
} 