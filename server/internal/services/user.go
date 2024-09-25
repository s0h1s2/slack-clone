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
	auth    Auth
}

func NewUserService(ur repositories.UserRepo, hashing Hashing, auth Auth) *UserService {
	return &UserService{
		ur:      ur,
		hashing: hashing,
		auth:    auth,
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
func (s *UserService) LoginUser(data dto.LoginUserRequest) error {
	// find user by email
	_, err := s.ur.FindUserByEmail(context.Background(), data.Email)
	if err != nil {
		if errors.Is(err, repositories.ErrRecordNotFound) {
			return errors.New("Invalid credentials")
		}
		return err
	}

	// compare password and hahsed password
	// if password match then generate token
	token, err := s.auth.GenerateAccessToken()
	if err != nil {
		return err
	}
	println(token)
	return nil
}

// hello,world!
