package httperror

import (
	"errors"
	"net/http"

	"github.com/s0h1s2/slack-clone/internal/apperr"
	"github.com/s0h1s2/slack-clone/internal/services"
)

type apiResponse struct {
	Status int         `json:"status"`
	Errors interface{} `json:"errors"`
}

func ConvertErrorToHttpError(err error) *apiResponse {
	var svcErr *apperr.ServiceError
	if errors.As(err, &svcErr) {
		switch svcErr.Code {
		case services.ErrNotFound:
			{
				return &apiResponse{
					Status: http.StatusNotFound,
					Errors: svcErr.Err,
				}
			}
		case services.ErrBadRequest:
			{
				if fieldErrors, ok := svcErr.Err.(*apperr.FieldErrors); ok {
					return &apiResponse{
						Status: http.StatusUnprocessableEntity,
						Errors: fieldErrors.GetFieldErrors(),
					}
				}
				return &apiResponse{
					Status: http.StatusUnprocessableEntity,
					Errors: svcErr.Err,
				}
			}
		}
	}
	return &apiResponse{
		Status: http.StatusInternalServerError,
		Errors: "Internal server error",
	}
}
