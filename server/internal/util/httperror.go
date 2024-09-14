package util

import (
	"errors"
	"net/http"

	"github.com/s0h1s2/slack-clone/internal/apperr"
	"github.com/s0h1s2/slack-clone/internal/services"
)

func ConvertServiceErrorToHttpError(err error) *ApiResponse {
	var svcErr apperr.ServiceError
	if errors.As(err, &svcErr) {
		switch svcErr.SvcError() {
		case services.ErrNotFound:
			{
				return &ApiResponse{
					Status: http.StatusNotFound,
					Body:   svcErr.AppError(),
				}
			}
		case services.ErrBadRequest:
			{
				return &ApiResponse{
					Status: http.StatusUnprocessableEntity,
					Body:   svcErr.AppError(),
				}

			}
		}
	}
	return &ApiResponse{
		Status: http.StatusInternalServerError,
		Body:   "Internal server error",
	}
}
