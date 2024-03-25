package users

import (
	"database/sql"
	"errors"
	"time"

	"github.com/Nagarjuna-PradeepKumar/hospital-management-system/pkg/entities"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/log"
	"github.com/google/uuid"
)

type userRepository struct {
	db *sql.DB
}

type Repository interface {
	// Create creates a new user
	CreateUser(c *fiber.Ctx, userName string, displayName string, phoneNumber string, password string) (uuid.UUID, error)
	GetUserByUniqueName(c *fiber.Ctx, userName string) (entities.User, error)
}

func NewRepository(db *sql.DB) Repository {
	return &userRepository{
		db: db,
	}
}

func (r userRepository) CreateUser(c *fiber.Ctx, userName string, displayName string, phoneNumber string, password string) (uuid.UUID, error) {
	sqlStatement := "INSERT INTO public.users (id, user_name, display_name, user_password, phone_no, created_at) VALUES($1,$2,$3,$4,$5,$6);"
	userId, err := uuid.NewUUID()
	if err != nil {
		log.Error(err)
		return uuid.Nil, errors.New("error generating userid")
	}
	if _, err = r.db.ExecContext(c.UserContext(), sqlStatement, userId, userName, displayName, password, phoneNumber, time.Now().UTC()); err != nil {
		log.Error(err)
		return uuid.Nil, errors.New("error creating user")
	}

	return userId, nil
}

func (r userRepository) GetUserByUniqueName(c *fiber.Ctx, userName string) (entities.User, error) {
	var user entities.User

	var lastLogin, createdAt, updatedAt sql.NullTime
	sqlStatement := "SELECT id, user_name, display_name, phone_no, last_login, created_at, updated_at FROM public.users WHERE user_name=$1;"
	err := r.db.QueryRowContext(c.Context(), sqlStatement, userName).Scan(&user.Id, &user.UserName, &user.DisplayName, &user.PhoneNumber, &lastLogin, &createdAt, &updatedAt)
	if err != nil && err != sql.ErrNoRows {
		log.Error(err)
		return user, err
	}

	user.LastLogin = lastLogin.Time
	user.CreatedAt = createdAt.Time
	user.UpdatedAt = updatedAt.Time

	return user, nil
}
