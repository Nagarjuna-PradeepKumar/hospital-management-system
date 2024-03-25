package main

import (
	"fmt"

	"github.com/Nagarjuna-PradeepKumar/hospital-management-system/middlewares"
	"github.com/Nagarjuna-PradeepKumar/hospital-management-system/setup"
	"github.com/Nagarjuna-PradeepKumar/hospital-management-system/utils"
	"github.com/gofiber/fiber/v2"
)

func main() {
	err := utils.LoadEnvironmentVariables(".env")
	if err != nil {
		fmt.Println(".env file not found. Loading environment variables from system")
	}
	// Ititialize Database Connection
	db := setup.InitDatabaseAndGetDb()
	// Close Database Connection
	defer db.Close()

	// Initialize Services
	appServices := setup.InitRepositoriesAndServices(db)

	app := fiber.New()

	middlewares.RegisterMiddleware(app)

	api := app.Group("/api/v1")
	fmt.Println(&app, " first app Address")
	fmt.Println(&appServices, " first service Address")

	setup.InitRouter(&api, appServices)

	app.Listen(":3000")
}
