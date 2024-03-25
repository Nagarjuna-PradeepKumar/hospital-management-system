package presenter

import "github.com/google/uuid"

type CreateUserRequest struct {
	UserName    string `json:"userName"`
	PhoneNumber string `json:"phoneNumber"`
	Password    string `json:"password"`
}

type CreateUserResponse struct {
	UserId uuid.UUID `json:"userId"`
}
