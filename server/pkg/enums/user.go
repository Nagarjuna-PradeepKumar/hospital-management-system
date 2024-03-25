package enums

type userRole int

const (
	Admin userRole = iota
	Receptionist
	Patient
	Doctor
	LabTechnician
)

var singleton *userRole

const UnknownUserRole userRole = -1

type UserRole interface {
	String() string
	FromString(status string) userRole
	FromInt(status int) userRole
	IsUserRole(status string) bool
}

func PaymentStatusEnum() UserRole {
	if singleton == nil {
		singleton = new(userRole)
	}
	return singleton
}

func (s userRole) String() string {
	switch s {
	case Admin:
		return "Admin"
	case Receptionist:
		return "Receptionist"
	case Patient:
		return "Patient"
	case Doctor:
		return "Doctor"
	case LabTechnician:
		return "LabTechnician"
	default:
		return "UnknownUserRole"
	}
}
func (s userRole) FromInt(userRole int) userRole {
	switch userRole {
	case 0:
		return Admin
	case 1:
		return Receptionist
	case 2:
		return Patient
	case 3:
		return Doctor
	case 4:
		return LabTechnician
	default:
		return UnknownUserRole
	}
}
func (s userRole) FromString(userRole string) userRole {
	switch userRole {
	case "Admin":
		return Admin
	case "Receptionist":
		return Receptionist
	case "Patient":
		return Patient
	case "Doctor":
		return Doctor
	case "LabTechnician":
		return LabTechnician

	default:
		return UnknownUserRole
	}
}
func (s userRole) IsUserRole(userRole string) bool {
	return s.FromString(userRole).String() != "UnknownUserRole"
}
