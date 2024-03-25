package setup

import (
	"database/sql"
	"fmt"

	"github.com/Nagarjuna-PradeepKumar/hospital-management-system/utils"
)

func InitDatabaseAndGetDb() *sql.DB {
	dbName := utils.GetEnvVar("POSTGRES_DB", "Database Name")
	dbHost := utils.GetEnvVar("POSTGRES_DB_HOST", "Database Host")
	dbUser := utils.GetEnvVar("POSTGRES_DB_USER", "Database User")
	dbPassword := utils.GetEnvVar("POSTGRES_DB_PASSWORD", "Database Password")
	connectionString := fmt.Sprintf("postgres://%s:%s@%s/%s?sslmode=disable", dbUser, dbPassword, dbHost, dbName)
	return utils.InitDatabase(connectionString)
}
