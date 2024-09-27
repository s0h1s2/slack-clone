package infrastructure

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type jwtGenerator struct{}

func NewJwtGenerator() *jwtGenerator {
	return &jwtGenerator{}
}

type Claims struct {
	Email string `json:"email"`
	jwt.RegisteredClaims
}

func (a *jwtGenerator) GenerateAccessToken(email string) (string, error) {
	expireTime := time.Now().Add(1 * time.Hour)
	claims := &Claims{
		Email: email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expireTime),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte("Some Secret String"))
	if err != nil {
		return "", err
	}
	return tokenString, nil
}
