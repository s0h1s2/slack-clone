package main

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/s0h1s2/slack-clone/internal/handlers"
	"github.com/s0h1s2/slack-clone/internal/infrastructure"
	"github.com/s0h1s2/slack-clone/internal/infrastructure/postgres"
	"github.com/s0h1s2/slack-clone/internal/services"
)

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
	bcryptService := infrastructure.NewBcryptHahser()
	userRepo := postgres.NewPostgresUserRepo(conn)
	userService := services.NewUserService(userRepo, bcryptService)
	userHanlder := handlers.NewUserHandler(userService)
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	userHanlder.RegisterUserRoutes(e)
	e.Validator = infrastructure.NewCustomValidator()
	e.Logger.Fatal(e.Start(":8000"))
}
