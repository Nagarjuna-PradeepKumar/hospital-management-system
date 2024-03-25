package routes

import (
	"github.com/Nagarjuna-PradeepKumar/hospital-management-system/api/handlers"
	"github.com/Nagarjuna-PradeepKumar/hospital-management-system/pkg/users"
	"github.com/gofiber/fiber/v2"
)

func UserRouter(app fiber.Router, service users.UserService) {
	app.Post("/signup", handlers.CreateUser(service))
}
