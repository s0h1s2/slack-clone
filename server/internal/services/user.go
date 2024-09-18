package services

import (
	"context"
	"errors"
	"github.com/s0h1s2/slack-clone/internal/entities"
	"github.com/s0h1s2/slack-clone/internal/repositories"
)

type UserService struct {
	ur repositories.UserRepo
}

func NewUserService(ur repositories.UserRepo) *UserService {
	return &UserService{
		ur: ur,
	}
}
func (s *UserService) CreateUserByEmail(user *entities.User) error {

	// find user and check if username is exist
	if isUserExist, _ := s.ur.IsUserEmailExists(context.Background(), user.Email); isUserExist {
		return errors.New("Email already taken.")
	}

	if err := s.ur.CreateUser(context.Background(), user); err != nil {
		return errors.New("Unable to create user.")
	}
	return nil
}
