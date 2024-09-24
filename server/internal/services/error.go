package services

import "errors"

var (
	ErrBadRequest    = errors.New("Bad Request")
	ErrNotFound      = errors.New("Bad Request")
	ErrUnauthorized  = errors.New("unauthorized")
	ErrInternalError = errors.New("Internal Server Error")
)
