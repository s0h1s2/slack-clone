package apperr

type FieldErrors struct {
	Errors map[string]string
}

func NewFieldErrors() *FieldErrors {
	return &FieldErrors{
		Errors: make(map[string]string),
	}
}
func (f *FieldErrors) GetFieldErrors() map[string]string {
	return f.Errors
}
func (f *FieldErrors) AddFieldError(field, err string) {
	f.Errors[field] = err
}
func (f *FieldErrors) Error() string {
	return "field-error"
}
