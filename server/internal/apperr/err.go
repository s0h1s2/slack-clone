package apperr

import "errors"

type ServiceError struct {
	Code error
	Err  error
}

func NewServiceError(code, err error) *ServiceError {
	return &ServiceError{
		Code: code,
		Err:  err,
	}
}
func (s *ServiceError) Error() string {
	return errors.Join(s.Code, s.Err).Error()
}

func (s *ServiceError) Unwrap() error {
	return s.Err
}
