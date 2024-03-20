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

	migrationDirection := strings.ToLower(*mgd)

	if migrationDirection != "up" && migrationDirection != "down" {
		log.Fatalf("Invalid value '%s' for argument d. \n Flag 'd' should be either up or down", migrationDirection)
	}
	var dbMigrationDirection migrate.MigrationDirection
	if migrationDirection == "up" {
		dbMigrationDirection = migrate.Up
	} else {
		dbMigrationDirection = migrate.Down
	}
	err := godotenv.Load("migration.env")
	if err != nil {
		fmt.Println(".env file not found. Loading environment variables from system")
	}

	dbName := os.Getenv("POSTGRES_DB")
	dbHost := os.Getenv("POSTGRES_DB_HOST")
	dbUser := os.Getenv("POSTGRES_DB_USER")
	dbPassword := os.Getenv("POSTGRES_DB_PASSWORD")
	if dbName == "" {
		log.Fatal("Invalid Database Name")
	}
	if dbHost == "" {
		log.Fatal("Invalid Database Host")
	}
	if dbUser == "" {
		log.Fatal("Invalid Database User")
	}
	if dbPassword == "" {
		log.Fatal("Invalid Database Password")
	}

	databaseURL := fmt.Sprintf("postgres://%s:%s@%s/%s?sslmode=disable", dbUser, dbPassword, dbHost, dbName)

	// Create a new DB connection
	db, err := sql.Open("postgres", databaseURL)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Directory containing migration files
	migrationsDir := "sql-migrations"

	// Create a new FileMigrationSource
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
	migrations, err := migrationSource.FindMigrations()
	if err != nil {
		log.Fatal(err)
	}

	var targetVersion int
	// Finding Target Version
	for i, migration := range migrations {
		if migration.Id == migrateUptoFile {
			targetVersion = i + 1
		}
	}
	if targetVersion == 0 {
		log.Fatal("Invalid Migrate Till Value")
	}

	// Migrate up to the target version
	n, err := migrate.ExecMax(db, "postgres", migrationSource, migrationDirection, targetVersion)
	if err != nil {
		log.Print(err)
	}
	log.Printf("Migrated to version %d!\n", targetVersion)
	log.Printf("Applied %d migrations!\n", n)

}
func completeMigration(db *sql.DB, migrationSource migrate.FileMigrationSource, migrationDirection migrate.MigrationDirection) {
	n, err := migrate.Exec(db, "postgres", migrationSource, migrationDirection)
	if err != nil {
		log.Print(err)
	}
	log.Printf("Applied %d migrations!\n", n)
}
