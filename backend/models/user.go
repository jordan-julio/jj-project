package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name     string `json:"name"`
	Email    string `json:"email" gorm:"uniqueIndex"`
	Password string `json:"password"` // hashed
	Role     string `json:"role"`     // "freelancer", "client", or "admin"
	Bio      string `json:"bio"`
	Skills   string `json:"skills"` // comma-separated, or later normalized to a table
	Location string `json:"location"`
	Whatsapp string `json:"whatsapp"`
	Avatar   string `json:"avatar"` // URL to profile image
}
