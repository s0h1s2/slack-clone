package httperror

import (
	"errors"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/s0h1s2/slack-clone/internal/apperr"
	"github.com/s0h1s2/slack-clone/internal/services"
)

type ErrorApiResponse struct {
	Status int         `json:"status"`
	Errors interface{} `json:"errors"`
}
type UnprocessableEntityApiResponse struct {
	Status int               `json:"status"`
	Errors map[string]string `json:"errors"`
}

func ConvertErrorToHttpError(err error) *ErrorApiResponse {
	var svcErr *apperr.ServiceError
	if errors.As(err, &svcErr) {
		switch svcErr.Code {
		case services.ErrNotFound:
			{
				return &ErrorApiResponse{
					Status: http.StatusNotFound,
					Errors: svcErr.Err,
				}
			}
		case services.ErrUnauthorized:
			{
				return &ErrorApiResponse{
					Status: http.StatusUnauthorized,
					Errors: svcErr.Err,
				}
			}
		case services.ErrBadRequest:
			{
				if fieldErrors, ok := svcErr.Err.(*apperr.FieldErrors); ok {
					return &ErrorApiResponse{
						Status: http.StatusUnprocessableEntity,
						Errors: fieldErrors.GetFieldErrors(),
					}
				}
				return &ErrorApiResponse{
					Status: http.StatusUnprocessableEntity,
					Errors: svcErr.Err,
				}
			}
		}
	}
	log.Printf("ERROR:an error occured during request:%v\n", err)
	return &ErrorApiResponse{
		Status: http.StatusInternalServerError,
		Errors: "Internal server error",
	}
}
func WrapHttpErrorToEchoError(err error, ctx echo.Context) error {
	result := ConvertErrorToHttpError(err)
	return ctx.JSON(result.Status, result)
}
