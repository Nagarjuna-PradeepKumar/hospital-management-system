package main

import (
	"github.com/Nagarjuna-PradeepKumar/hospital-management-system/auth"
	"github.com/Nagarjuna-PradeepKumar/hospital-management-system/middlewares"
	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	middlewares.RegisterMiddleware(app)

	api := app.Group("/api/v1")

	auth.RegisterAuthRoutes(api)

	app.Listen(":3000")
}
