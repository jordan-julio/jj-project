package models

import "gorm.io/gorm"

type Review struct {
	gorm.Model
	FromUserID uint   `json:"from_user_id"` // reviewer
	ToUserID   uint   `json:"to_user_id"`   // freelancer being reviewed
	Rating     int    `json:"rating"`       // 1–5
	Comment    string `json:"comment"`
}
