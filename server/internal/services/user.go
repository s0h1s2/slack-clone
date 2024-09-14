package services

import (
	"context"
	"errors"

	"github.com/go-playground/validator/v10"
	"github.com/s0h1s2/slack-clone/internal/apperr"
	"github.com/s0h1s2/slack-clone/internal/dto"
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
func (s *UserService) CreateUserByEmail(data dto.CreateUserRequest) error {
	validate := validator.New(validator.WithRequiredStructEnabled())
	err := validate.Struct(data)
	if err != nil {
		return apperr.NewError(ErrBadRequest)
	}
	// find user and check if username is exist
	if isUserExist, _ := s.ur.IsUserEmailExists(context.Background(), data.Email); isUserExist {
		return apperr.NewError(ErrBadRequest, map[string]any{})
	}
	user := &entities.User{
		Email:    data.Email,
		Password: data.Password,
	}
	if err := s.ur.CreateUser(context.Background(), user); err != nil {
		return errors.New("Unable to create user.")
	}
	return nil
}
