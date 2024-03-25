package users

import (
	"database/sql"

	"github.com/google/uuid"
)

type userRepository struct {
	db *sql.DB
}

type Repository interface {
	// Create creates a new user
	CreateUser(userName string, phoneNumber string, password string) (uuid.UUID, error)
}

func NewRepository(db *sql.DB) Repository {
	return &userRepository{
		db: db,
	}
}

func (r userRepository) CreateUser(userName string, phoneNumber string, password string) (uuid.UUID, error) {
	return uuid.Nil, nil
}
