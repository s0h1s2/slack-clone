package services

import (
	"context"
	"errors"

	"github.com/s0h1s2/slack-clone/internal/apperr"
	"github.com/s0h1s2/slack-clone/internal/dto"
	"github.com/s0h1s2/slack-clone/internal/entities"
	"github.com/s0h1s2/slack-clone/internal/repositories"
)

type UserService struct {
	ur      repositories.UserRepo
	hashing Hashing
}

func NewUserService(ur repositories.UserRepo, hashing Hashing) *UserService {
	return &UserService{
		ur:      ur,
		hashing: hashing,
	}
}
func (s *UserService) CreateUserByEmail(userData dto.CreateUserRequest) error {
	if isUserExist, _ := s.ur.IsUserEmailExists(context.Background(), userData.Email); isUserExist {
		fieldErr := apperr.NewFieldErrors()
		fieldErr.AddFieldError("email", "Email already taken.")
		return apperr.NewServiceError(ErrBadRequest, fieldErr)
	}
	hashedPassword, err := s.hashing.HashPassword(userData.Password)
	if err != nil {
		return err
	}
	user := &entities.User{
		Email:          userData.Email,
		HashedPassword: hashedPassword,
	}
	if err := s.ur.CreateUser(context.Background(), user); err != nil {
		return errors.New("Unable to create user.")
	}
	return nil
}
