package services

import "errors"

var (
	ErrBadRequest    = errors.New("Bad Request")
	ErrNotFound      = errors.New("Bad Request")
	ErrInternalError = errors.New("Internal Server Error")
)
