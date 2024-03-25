package handlers

import (
	"errors"
	"net/http"

	"github.com/Nagarjuna-PradeepKumar/hospital-management-system/api/presenter"
	"github.com/Nagarjuna-PradeepKumar/hospital-management-system/pkg/users"
	"github.com/gofiber/fiber/v2"
)

func CreateUser(service users.UserService) fiber.Handler {
	return func(c *fiber.Ctx) error {
		var requestBody presenter.CreateUserRequest
		err := c.BodyParser(&requestBody)
		if err != nil {
			c.Status(http.StatusBadRequest)
			return errors.New("cannot parse data")
		}
		if requestBody.UserName == "" || requestBody.Password == "" {
			c.Status(http.StatusBadRequest)
			return errors.New("please enter name and password")
		}

		userId, err := service.CreateUser(c, requestBody.UserName, requestBody.DisplayName, requestBody.PhoneNumber, requestBody.Password)
		if err != nil {
			return err
		}

		return c.JSON(presenter.CreateUserResponse{
			UserId: userId,
		})
	}
}
