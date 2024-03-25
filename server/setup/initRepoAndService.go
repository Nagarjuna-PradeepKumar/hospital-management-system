package setup

import (
	"database/sql"

	"github.com/Nagarjuna-PradeepKumar/hospital-management-system/pkg/users"
)

type appServices struct {
	userService users.UserService
}

func InitRepositoriesAndServices(db *sql.DB) appServices {
	/*
		Initialize Repository
	*/

	userRepository := users.NewRepository(db)

	/*
		Initialize Service
	*/
	userService := users.NewService(userRepository)

	return appServices{
		userService: userService,
	}

}
