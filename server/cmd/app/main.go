package main

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	_ "github.com/s0h1s2/slack-clone/docs"
	"github.com/s0h1s2/slack-clone/internal/handlers"
	"github.com/s0h1s2/slack-clone/internal/infrastructure"
	"github.com/s0h1s2/slack-clone/internal/infrastructure/postgres"
	"github.com/s0h1s2/slack-clone/internal/services"
	echoSwagger "github.com/swaggo/echo-swagger"
)

//	@title			Slack API documentation
//	@version		1.0
//	@description	This is a sample server celler server.
//	@termsOfService	http://swagger.io/terms/

//	@contact.name	API Support
//	@contact.url	http://www.swagger.io/support
//	@contact.email	support@swagger.io

//	@license.name	Apache 2.0
//	@license.url	http://www.apache.org/licenses/LICENSE-2.0.html

//	@host		localhost:8000
//	@BasePath	/api/v1

//	@externalDocs.description	OpenAPI
//	@externalDocs.url			https://swagger.io/resources/open-api/
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
	e.GET("/docs/*", echoSwagger.WrapHandler)
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

	userHanlder.RegisterUserRoutes(e)
	e.Validator = infrastructure.NewCustomValidator()
	e.Logger.Fatal(e.Start(":8000"))
}
