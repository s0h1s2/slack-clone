package main

import (
	"context"
	"fmt"
	"net/http"
	"os"

	"github.com/go-playground/validator/v10"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/labstack/echo/v4"
	"github.com/s0h1s2/slack-clone/internal/handlers"
	"github.com/s0h1s2/slack-clone/internal/infrastructure/postgres"
	"github.com/s0h1s2/slack-clone/internal/services"
)

type MemoryUserRepository struct{}
type customValidator struct {
	validator *validator.Validate
}

func (cv *customValidator) Validate(i interface{}) error {
	if err := cv.validator.Struct(i); err != nil {
		errors := make(map[string]string, 5)
		for _, validationErr := range err.(validator.ValidationErrors) {
			errors[validationErr.Field()] = validationErr.Error()
		}
		return echo.NewHTTPError(http.StatusUnprocessableEntity, errors)
	}
	return nil
}

func main() {
	conn, err := pgxpool.New(context.Background(), "postgresql://buffer:7xiOfdht7DuCtFEhgDK19A@royal-kudu-9809.7tc.aws-eu-central-1.cockroachlabs.cloud:26257/slack-clone?sslmode=verify-full")
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to create database connection pool:%v\n", err)
		os.Exit(1)
	}
	defer conn.Close()
	if err := conn.Ping(context.Background()); err != nil {
		fmt.Fprintf(os.Stderr, "Unable to ping:%v\n", err)
	}
	userRepo := postgres.NewPostgresUserRepo(conn)
	userService := services.NewUserService(userRepo)
	userHanlder := handlers.NewUserHandler(userService)
	e := echo.New()
	e.Validator = &customValidator{validator: validator.New()}
	userHanlder.RegisterUserRoutes(e)
	e.Logger.Fatal(e.Start(":8000"))
}
