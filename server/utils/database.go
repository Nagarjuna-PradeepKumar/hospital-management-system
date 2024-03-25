package utils

import (
	"database/sql"
	"sync"

	"github.com/gofiber/fiber/v2/log"
	_ "github.com/lib/pq"
)

var once sync.Once
var db *sql.DB

func InitDatabase(dbSource string) *sql.DB {
	var err error
	once.Do(func() {
		db, err = sql.Open("postgres", dbSource)
		if err != nil {
			log.Fatal("error opening database connection")
		}
		log.Info("postgres connection established")
	})
	return db
}

func GetDB() *sql.DB {
	return db
}

func CloseDB() {
	if db != nil {
		err := db.Close()
		if err != nil {
			log.Fatal("error closing database connection")
		}
		log.Info("postgres connection closed")
	}
}
