-- +goose Up
CREATE TABLE users(
  id int not null PRIMARY KEY,
  email string unique,
  password string
);
-- +goose Down
DROP TABLE users

