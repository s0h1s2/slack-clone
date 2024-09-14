package apperr

type ServiceError struct {
	svcErr  error
	details map[string]any
}

func NewError(svcErr error, details map[string]any) error {
	return ServiceError{
		svcErr:  svcErr,
		details: details,
	}
}
func (e ServiceError) AppError() interface{} {
	return e.details
}

func (e ServiceError) SvcError() error {
	return e.svcErr
}

func (e ServiceError) Error() string {
	return e.svcErr.Error()
}
