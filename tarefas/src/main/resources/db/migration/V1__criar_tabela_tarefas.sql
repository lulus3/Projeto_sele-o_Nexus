CREATE TABLE tarefas (
    id bigint(20) NOT NULL AUTO_INCREMENT,
    titulo varchar (100) NOT NULL,
    data datetime NOT NULL,
    status varchar(255) NOT NULL,
    descricao varchar(1500) NOT NULL,
    perfil_id bigint(28) NOT NULL,
    PRIMARY KEY (id)
);