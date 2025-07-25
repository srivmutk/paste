package main

import (
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	connection "github.com/srivmutk/paste/connection"
	handlers "github.com/srivmutk/paste/handlers"
	models "github.com/srivmutk/paste/models"
)

func main() {
	connection.Init()

	go connection.Create()

	go handlers.DeleteExpired()

	e := echo.New()

	e.Validator = models.MainValidator

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
	}))

	config := middleware.RateLimiterConfig{
		Skipper: middleware.DefaultSkipper,
		Store: middleware.NewRateLimiterMemoryStoreWithConfig(
			middleware.RateLimiterMemoryStoreConfig{Rate: 10, Burst: 30, ExpiresIn: 3 * time.Minute},
		),
		IdentifierExtractor: func(ctx echo.Context) (string, error) {
			id := ctx.RealIP()
			return id, nil
		},
		ErrorHandler: func(context echo.Context, err error) error {
			return context.JSON(http.StatusTooManyRequests, nil)
		},
		DenyHandler: func(context echo.Context, identifier string, err error) error {
			return context.JSON(http.StatusForbidden, nil)
		},
	}

	e.Use(middleware.RateLimiterWithConfig(config))

	e.GET("/", func(c echo.Context) (err error) {
		return c.JSON(http.StatusOK, "paste API")
	})
	e.POST("/p-create", handlers.CreatePaste)
	e.GET("/p/:id", handlers.GetPaste)
	e.GET("/p/:id/raw", handlers.GetRawPaste)
	e.GET("/langs", handlers.GetLanguages)

	e.Logger.Fatal(e.Start(":4300"))
}
