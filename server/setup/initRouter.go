package setup

import (
	"fmt"

	"github.com/Nagarjuna-PradeepKumar/hospital-management-system/api/routes"
	"github.com/gofiber/fiber/v2"
)

func InitRouter(app *fiber.Router, service appServices) {
	fmt.Println(&app, " app Address")
	fmt.Println(&service, " service Address")
	routes.UserRouter(*app, service.userService)
}
