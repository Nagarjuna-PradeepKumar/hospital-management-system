package utils

import (
	"os"

	"github.com/gofiber/fiber/v2/log"
	"github.com/joho/godotenv"
)

func LoadEnvironmentVariables(fileName string) error {
	err := godotenv.Load(fileName)
	if err != nil {
		log.Info(".env file not found. Loading environment variables from system")
	}
	return err
}

func GetEnvVar(key, label string) string {
	val := os.Getenv(key)
	if val == "" {
		log.Fatalf("Invalid %s", label)
	}
	return val
}
