export const userSchema = 
    `CREATE TABLE IF NOT EXISTS users ( 
        id int NOT NULL AUTO_INCREMENT, 
        username varchar(100) NOT NULL, 
        email varchar(100) NOT NULL, 
        password varchar(100) NOT NULL, 
        PRIMARY KEY (id), 
        UNIQUE KEY email_UNIQUE (email) 
    ) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`
;