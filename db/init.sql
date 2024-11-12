CREATE DATABASE IF NOT EXISTS project_crud;
USE project_crud;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

-- Datos de prueba
INSERT INTO users (name, email) VALUES 
('John Doe', 'john@example.com'), 
('Jane Doe', 'jane@example.com'),
('Alice Smith', 'alice@example.com'),
('Bob Johnson', 'bob@example.com'),
('Charlie Brown', 'charlie@example.com'),
('David Wilson', 'david@example.com'),
('Eva Green', 'eva@example.com'),
('Frank White', 'frank@example.com'),
('Grace Black', 'grace@example.com'),
('Hannah Blue', 'hannah@example.com');