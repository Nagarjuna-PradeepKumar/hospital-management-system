package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"strings"

	"flag"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq" // Import the database driver
	migrate "github.com/rubenv/sql-migrate"
)

func main() {

	mgd := flag.String("d", "up", "Migration Direction")
	migrateTill := flag.String("t", "complete", "Migrate till")

	flag.Parse()

	dbMigrationDirection := getMigrationDirection(*mgd)

	err := godotenv.Load("migration.env")
	if err != nil {
		fmt.Println(".env file not found. Loading environment variables from system")
	}

	dbName := getEnvVar("POSTGRES_DB", "Database Name")
	dbHost := getEnvVar("POSTGRES_DB_HOST", "Database Host")
	dbUser := getEnvVar("POSTGRES_DB_USER", "Database User")
	dbPassword := getEnvVar("POSTGRES_DB_PASSWORD", "Database Password")

	databaseURL := fmt.Sprintf("postgres://%s:%s@%s/%s?sslmode=disable", dbUser, dbPassword, dbHost, dbName)

	// Create a new DB connection
	db, err := sql.Open("postgres", databaseURL)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Directory containing migration files
	migrationsDir := "sql-migrations"

	fileMigrationSource := &migrate.FileMigrationSource{
		Dir: migrationsDir,
	}
	if *migrateTill == "complete" {
		completeMigration(db, *fileMigrationSource, dbMigrationDirection)
	} else {
		migrateToVersion(db, *fileMigrationSource, dbMigrationDirection, *migrateTill)
	}
}
func migrateToVersion(db *sql.DB, migrationSource migrate.FileMigrationSource, migrationDirection migrate.MigrationDirection, migrateUptoFile string) {
	var targetVersion int
	var message string
	var err error
	var currentMigrationDataLength int

	if migrationDirection == migrate.Up {
		migrations, err := migrationSource.FindMigrations()
		if err != nil {
			log.Fatal(err)
		}
		for i, migration := range migrations {
			if migration.Id == migrateUptoFile {
				targetVersion = i + 1
				break
			}
		}
		if targetVersion == 0 {
			log.Fatal("Invalid Migrate Till Value")
		}
	} else {
		currentMigrationData, err := migrate.GetMigrationRecords(db, "postgres")
		if err != nil {
			log.Fatal(err)
		}
		currentMigrationDataLength = len((currentMigrationData))

		for i, migration := range currentMigrationData {
			if migration.Id == migrateUptoFile {
				targetVersion = currentMigrationDataLength - i
				break
			}
		}
		if targetVersion == 0 {
			log.Fatal("Invalid Migrate Till Value")
		}
	}

	// Migrate up to the target version
	n, err := migrate.ExecMax(db, "postgres", migrationSource, migrationDirection, targetVersion)
	if err != nil {
		log.Print(err)
	}

	if migrationDirection == migrate.Up {
		message = fmt.Sprintf("Migrated to version %d!", targetVersion)
	} else {
		message = fmt.Sprintf("Migrated to version %d!", currentMigrationDataLength-targetVersion)
	}

	log.Printf("%s\nApplied %d migrations!\n", message, n)
}

func completeMigration(db *sql.DB, migrationSource migrate.FileMigrationSource, migrationDirection migrate.MigrationDirection) {
	n, err := migrate.Exec(db, "postgres", migrationSource, migrationDirection)
	if err != nil {
		log.Print(err)
	}
	log.Printf("Applied %d migrations!\n", n)
}

func getMigrationDirection(direction string) migrate.MigrationDirection {

	migrationDirection := strings.ToLower(direction)

	if migrationDirection != "up" && migrationDirection != "down" {
		log.Fatalf("Invalid value '%s' for argument d. \n Flag 'd' should be either up or down", migrationDirection)
	}

	if direction == "down" {
		return migrate.Down
	}
	return migrate.Up
}

func getEnvVar(key, label string) string {
	val := os.Getenv(key)
	if val == "" {
		log.Fatalf("Invalid %s", label)
	}
	return val
}
