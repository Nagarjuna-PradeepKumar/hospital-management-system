package users

import (
	"errors"
	"sync"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

var once sync.Once
var svc *service

type service struct {
	userRepository Repository
}

type UserService interface {
	CreateUser(c *fiber.Ctx, userName string, displayName string, phoneNumber string, password string) (uuid.UUID, error)
}

// NewService Creates the service and returns a pointer with Service methods implemented.
func NewService(repository Repository) UserService {
	//Singleton patterns for service
	once.Do(func() {
		svc = &service{
			userRepository: repository,
		}
	})
	return svc
}

func (s service) CreateUser(c *fiber.Ctx, userName string, displayName string, phoneNumber string, password string) (uuid.UUID, error) {
	// Check if user already present
	userData, err := s.userRepository.GetUserByUniqueName(c, userName)
	if err != nil {
		return uuid.Nil, err
	}
	if userData.Id != uuid.Nil {
		c.Status(fiber.StatusConflict)
		return uuid.Nil, errors.New("user already exist")
	}
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return uuid.Nil, errors.New("error creating user")
	}
	return s.userRepository.CreateUser(c, userName, displayName, phoneNumber, string(hashedPassword))
}
