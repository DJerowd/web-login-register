import Joi from "joi";

// Schema de validação para usuário (registro e atualização)
export const userSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().max(100).required(),
    password: Joi.string().min(6).max(100), // obrigatória no registro, opcional na atualização
});

// Schema de validação para veículo (criação e atualização)
export const vehicleSchema = Joi.object({
    name: Joi.string().max(100).allow(null, ''),
    brand: Joi.string().max(45).required(),
    model: Joi.string().max(45).required(),
    version: Joi.string().max(45).allow(null, ''),
    color: Joi.string().max(45).required(),
    licensePlate: Joi.string().max(10).allow(null, ''),
    mileage: Joi.number().integer().min(0).allow(null),
});

// Middleware genérico de validação
export function validateBody(schema, requirePassword = false) {
    return (req, res, next) => {
        let data = req.body;
        // Se password não é obrigatório (atualização de usuário), remove se não enviado
        if (!requirePassword && data.password === undefined) {
            data = { ...data };
            delete data.password;
        }
        const { error } = schema.validate(data, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: "Dados inválidos",
                details: error.details.map(d => d.message)
            });
        }
        next();
    };
} 