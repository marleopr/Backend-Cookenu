CREATE TABLE users_cookenu (
	id VARCHAR(255) PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
	role ENUM("NORMAL", "ADMIN") DEFAULT "NORMAL"
);

SELECT * FROM users_cookenu;

DROP TABLE users_cookenu;

CREATE TABLE recipes_cookenu (
	id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    create_Date VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users_cookenu(id)
);

SELECT * FROM recipes_cookenu;

DROP TABLE recipes_cookenu;