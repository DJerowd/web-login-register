import mysql from "mysql";

// CONEXÃO COM O BANCO DE DADOS
export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Root141314",
    database: "mygarage"
});

// CARREGAR AS TABELAS
db.connect(function(err) {
    if (err) {  
        console.log(JSON.stringify(err));
        throw err;
    }
    console.log("Connected");

    // TABELA USUÁRIOS
    var sql = "CREATE TABLE IF NOT EXISTS `users` ( `id` int NOT NULL AUTO_INCREMENT, `username` varchar(100) NOT NULL, `email` varchar(100) NOT NULL, `password` varchar(100) NOT NULL, PRIMARY KEY (`id`), UNIQUE KEY `email_UNIQUE` (`email`) ) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;";
    db.query(sql, function (err, result) {
        if (err) {  
            console.log(JSON.stringify(err));
            throw err;
        }
        console.log("Table users ok");
    });
});