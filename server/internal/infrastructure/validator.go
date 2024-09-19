package infrastructure

import (
	"net/http"
	"reflect"
	"strings"

	"github.com/go-playground/locales/en"
	ut "github.com/go-playground/universal-translator"
	"github.com/go-playground/validator/v10"
	en_translations "github.com/go-playground/validator/v10/translations/en"
	"github.com/labstack/echo/v4"
)

type customValidator struct {
	valiator *validator.Validate
	uni      ut.Translator
}

func NewCustomValidator() *customValidator {
	english := en.New()
	uni := ut.New(english, english)
	validator := validator.New()
	trans, _ := uni.GetTranslator("en")
	en_translations.RegisterDefaultTranslations(validator, trans)
	validator.RegisterTagNameFunc(func(fld reflect.StructField) string {
		name := strings.SplitN(fld.Tag.Get("json"), ",", 2)[0]
		if name == "-" {
			return ""
		}
		return name
	})
	return &customValidator{
		valiator: validator,
		uni:      trans,
	}
}
func (c *customValidator) Validate(i interface{}) error {
	if err := c.valiator.Struct(i); err != nil {
		errors := make(map[string]string, 5)
		for _, validationErr := range err.(validator.ValidationErrors) {
			errors[validationErr.Field()] = validationErr.Translate(c.uni)
		}
		return echo.NewHTTPError(http.StatusUnprocessableEntity, errors)
	}
	return nil
}
