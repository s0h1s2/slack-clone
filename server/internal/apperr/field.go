package apperr

type FieldErrors struct {
	errors map[string]string
}

func NewFieldErrors() *FieldErrors {
	return &FieldErrors{
		errors: make(map[string]string),
	}
}
func (f *FieldErrors) GetFieldErrors() map[string]string {
	return f.errors
}
func (f *FieldErrors) AddFieldError(field, err string) {
	f.errors[field] = err
}
func (f *FieldErrors) Error() string {
	return "field-error"
}
