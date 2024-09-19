package postgres

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/s0h1s2/slack-clone/internal/entities"
)

type userPostgresRepo struct {
	db *pgxpool.Pool
}

func NewPostgresUserRepo(db *pgxpool.Pool) *userPostgresRepo {
	return &userPostgresRepo{
		db: db,
	}
}

func (u *userPostgresRepo) IsUserEmailExists(ctx context.Context, email string) (bool, error) {
	exists := false
	err := u.db.QueryRow(ctx, "SELECT EXISTS(SELECT 1 FROM users WHERE email=$1)", email).Scan(&exists)
	if err != nil {
		return false, fmt.Errorf("Unable to query check if user exists by email: %w", err)
	}
	return exists, nil
}

func (u *userPostgresRepo) CreateUser(ctx context.Context, user *entities.User) error {
	_, err := u.db.Exec(ctx, "INSERT INTO users (email,password) VALUES ($1,$2)", user.Email, user.HashedPassword)
	if err != nil {
		return fmt.Errorf("Unable to insert user:%w", err)
	}
	return nil
}
