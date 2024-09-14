package repositories

import (
	"context"
	"github.com/s0h1s2/slack-clone/internal/entities"
)

type UserRepo interface {
	// FindUserByEmail(ctx context.Context, email string) (*entities.User, error)
	IsUserEmailExists(ctx context.Context, email string) (bool, error)
	CreateUser(ctx context.Context, user *entities.User) error
}
