import mysql from "mysql";

import { userSchema } from "../models/userSchema.js";

// CONFIGURAÇÃO DA CONEXÃO COM O BANCO DE DADOS
export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Root141314",
    database: "mygarage"
});

// CARREGAR BANCO DE DADOS
db.connect(function(err) {
    if (err) {  
        console.log(JSON.stringify(err));
        throw err;
    }
    // CARREGAR TABELA USUÁRIOS
    db.query(userSchema, function (err, result) {
        if (err) {
            console.log(JSON.stringify(err));
            throw err;
        }
    });
});