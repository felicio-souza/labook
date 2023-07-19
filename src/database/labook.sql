-- Active: 1685903032166@@127.0.0.1@3306


CREATE TABLE users(

    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    role NOT NULL,
    created_at TEXT DEFAULT(DATETIME())


);

CREATE TABLE posts(

    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes TEXT DEFAULT(0) NOT NULL,
    dislikes TEXT DEFAULT(0) NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    update_at TEXT DEFAULT(DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id)

);

CREATE TABLE likes_dislikes(

    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY(post_id) REFERENCES post(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE

);

INSERT INTO users (id, name, email, password, role)
VALUES
("us0001", "marcos", "marcos@empresa.teste", "casatrabalho2023", "ADMIN"),
("us0002", "julio", "julio@casa.teste", "tudojunto2023", "NORMAL"),
("us0003", "bruna", "brunas@face.teste", "gatosdameianoite123", "NORMAL")
;

INSERT INTO posts (id, creator_id, content )
VALUES
("ps0001", "us001", "Hoje a lua esta bela"),
("ps0002", "us002", "A casa de nuitas moradas"),
("ps0003", "us003", "A vida que buscamos")
;

INSERT INTO likes_dislikes (user_id, post_id, like)
VALUES
("us0001", "ps0002", 1),
("us0002", "ps0003", 1),
("us0003", "ps0001", 0)
;



DROP TABLE likes_dislikes;
DROP TABLE posts;
DROP TABLE users;




SELECT * FROM users;
SELECT * FROM posts;
SELECT * FROM likes_dislikes;


UPDATE posts
SET dislikes = 1
WHERE id = "ps0001";

UPDATE posts
SET likes = 1
WHERE id = "ps0002";

UPDATE posts
SET likes = 1
WHERE id = "ps0003";
