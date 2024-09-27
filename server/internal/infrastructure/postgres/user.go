package postgres

import (
	"context"
	"errors"
	"fmt"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/s0h1s2/slack-clone/internal/entities"
	"github.com/s0h1s2/slack-clone/internal/repositories"
)

type userPostgresRepo struct {
	db *pgxpool.Pool
}

func NewPostgresUserRepo(db *pgxpool.Pool) *userPostgresRepo {
	return &userPostgresRepo{
		db: db,
	}
}

func (u *userPostgresRepo) FindUserByEmail(ctx context.Context, email string) (*entities.User, error) {
	user := &entities.User{}
	err := u.db.QueryRow(ctx, "SELECT id,email,password FROM users WHERE email=$1", email).Scan(&user.ID, &user.Email, &user.HashedPassword)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, repositories.ErrRecordNotFound
		}
		return nil, fmt.Errorf("unable to find user by email in query:%w", err)
	}
	return user, nil
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
	_, err := u.db.Exec(ctx, "INSERT INTO users (name,email,password) VALUES ($1,$2,$3)", user.Name, user.Email, user.HashedPassword)
	if err != nil {
		return fmt.Errorf("Unable to insert user:%w", err)
	}
	return nil
}
