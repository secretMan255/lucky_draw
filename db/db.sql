CREATE DATABASE IF NOT EXISTS luckyDraw;
USE luckyDraw;

CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS gifts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  winner_id INT DEFAULT NULL,
  CONSTRAINT uc_gift_winner UNIQUE (id, winner_id),
  FOREIGN KEY (winner_id) REFERENCES users(id)
);

INSERT INTO users (name) VALUES
('Alice'),
('Bob'),
('Charlie'),
('Diana'),
('Edward');

INSERT INTO gifts (name) VALUES
('iPhone 15'),
('PlayStation 5'),
('MacBook Air'),
('Nintendo Switch'),
('Samsung TV');
