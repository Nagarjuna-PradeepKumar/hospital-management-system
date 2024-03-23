package users

import (
	"database/sql"

	"github.com/google/uuid"
)

type userRepository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) (Repository, error) {
	return &userRepository{
		db: db,
	}, nil
}

func (r userRepository) CreateUser(userName string, phoneNumber string, password string) (uuid.UUID, error) {
	return uuid.Nil, nil
}
