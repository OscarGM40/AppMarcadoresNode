--Esta bien.El problema es que es SQL SERVER
--desde cli mysql -u root -p  <- no uso en XAMPP
/*CREATE DATABASE database_links;
USE database_links;

--Tabla de usuarios
CREATE TABLE users
(
    id INT(11) NOT NULL, -- primary key column
    username varchar(20) NOT NULL,
    password VARCHAR(80) NOT NULL
    -- specify more columns here
);

ALTER TABLE users ADD PRIMARY KEY(id);

ALTER TABLE users 
MODIFY id INT(11) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 2;

--tabla de links
CREATE TABLE links(
    id INT(11) NOT NULL,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT(11),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

alter table links modify id int(11) not null 
auto_increment,auto_increment = 2;*/