package users

import (
	"sync"

	"github.com/gofiber/fiber/v2/log"
	"github.com/google/uuid"
)

var once sync.Once
var svc *service

type service struct {
	userRepository Repository
}

type UserService interface {
	CreateUser(userName string, phoneNumber string, password string) (uuid.UUID, error)
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

func (s service) CreateUser(userName string, phoneNumber string, password string) (uuid.UUID, error) {
	log.Info("Creating User")
	return s.userRepository.CreateUser(userName, phoneNumber, password)
}
