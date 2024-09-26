package infrastructure

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

type bcryptHahser struct{}

const bcryptPasswordCost = bcrypt.DefaultCost

func NewBcryptHahser() *bcryptHahser {
	return &bcryptHahser{}
}
func (b *bcryptHahser) HashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcryptPasswordCost)
	if err != nil {
		return "", fmt.Errorf("Unable to hash password:%w", err)
	}
	return string(hashedPassword), nil
}
func (b *bcryptHahser) CompareHashAndRawPassword(hashedPassword, rawPassword string) (bool, error) {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(rawPassword))
	if err != nil {
		return false, nil

	}
	return true, nil
}
