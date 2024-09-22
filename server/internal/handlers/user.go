package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/s0h1s2/slack-clone/internal/dto"
	"github.com/s0h1s2/slack-clone/internal/httperror"
	"github.com/s0h1s2/slack-clone/internal/services"
	"github.com/s0h1s2/slack-clone/internal/util"
)

type userHandler struct {
	us *services.UserService
}

func NewUserHandler(us *services.UserService) *userHandler {
	return &userHandler{
		us: us,
	}
}
func (u *userHandler) RegisterUserRoutes(e *echo.Group) {
	e.POST("/users", u.createUser)
}

//		createUser godoc
//
//		@Summary	Create user by email address
//		@Accept		json
//		@Produce	json
//
//	 @Param data body dto.CreateUserRequest true "body"
//
//		@Success	200
//		@Failure	422	{object}	httperror.UnprocessableEntityApiResponse
//
// @Router /users [post]
func (u *userHandler) createUser(ctx echo.Context) error {
	var data dto.CreateUserRequest
	if err := ctx.Bind(&data); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Bad Request")
	}
	if err := ctx.Validate(data); err != nil {
		return err
	}
	if err := u.us.CreateUserByEmail(data); err != nil {
		return ctx.JSON(http.StatusUnprocessableEntity, httperror.ConvertErrorToHttpError(err))
	}
	return ctx.JSON(http.StatusCreated, util.ApiResponse{Status: http.StatusCreated, Body: "User created successfully"})
}
