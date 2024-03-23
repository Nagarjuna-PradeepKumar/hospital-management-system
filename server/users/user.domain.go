package users

import "github.com/google/uuid"

type Repository interface {
	// Create creates a new user
	CreateUser(userName string, phoneNumber string, password string) (uuid.UUID, error)
}
