CREATE TABLE usuarios (
    id bigint(20) NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    senha VARCHAR(60) NOT NULL,
    PRIMARY KEY (id)
);