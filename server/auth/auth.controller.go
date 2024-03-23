package auth

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
)

func RegisterAuthRoutes(app fiber.Router) {
	app.Post("/signup", func(c *fiber.Ctx) error {
		var body signupUserRequestBody
		if err := c.BodyParser(&body); err != nil {
			log.Error("Error Parsing Signup Body")
			return err
		}
		return nil
	})
}
