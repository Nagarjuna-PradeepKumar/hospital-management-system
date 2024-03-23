package auth

import "github.com/google/uuid"

type signupUserRequestBody struct {
	UserName     string `json:"userName,omitempty"`
	PhoneNumber  string `json:"phoneNumber,omitempty"`
	UserPassword string `json:"userPassword"`
}

type signupUserResponse struct {
	Id          uuid.UUID `json:"id"`
	UserName    string    `json:"userName"`
	PhoneNumber string    `json:"phoneNumber"`
}
