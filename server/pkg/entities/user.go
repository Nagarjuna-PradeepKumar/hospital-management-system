package entities

import (
	"time"

	"github.com/Nagarjuna-PradeepKumar/hospital-management-system/pkg/enums"
	"github.com/google/uuid"
)

type User struct {
	Id           uuid.UUID `json:"id"`
	UserName     string    `json:"userName"`
	UserPassword string    `json:"userPassword"`
	PhoneNumber  string    `json:"phoneNumber"`
	LastLogin    string    `json:"lastLogin"`
	CreatedAt    time.Time `json:"createdAt"`
	UpdatedAt    time.Time `json:"updatedAt"`
}

type UserAddress struct {
	Id        uuid.UUID `json:"id"`
	UserId    uuid.UUID `json:"userId"`
	Address   string    `json:"address"`
	Landmark  string    `json:"landmark"`
	PinCode   string    `json:"pinCode"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

type Roles struct {
	Id     uuid.UUID      `json:"id"`
	UserId uuid.UUID      `json:"UserId"`
	Role   enums.UserRole `json:"Role"`
}
