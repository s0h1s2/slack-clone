package httperror

import (
	"errors"
	"net/http"

	"github.com/s0h1s2/slack-clone/internal/apperr"
	"github.com/s0h1s2/slack-clone/internal/services"
)

type ErrorApiResponse struct {
	Status int         `json:"status"`
	Errors interface{} `json:"errors"`
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
	return &ErrorApiResponse{
		Status: http.StatusInternalServerError,
		Errors: "Internal server error",
	}
}
