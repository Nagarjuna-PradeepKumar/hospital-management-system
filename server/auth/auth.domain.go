package auth

import "github.com/google/uuid"

type UserService interface {
	CreateUser(userName string, phoneNumber string, password string) (uuid.UUID, error)
}
