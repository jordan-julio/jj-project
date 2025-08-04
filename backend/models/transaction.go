package models

import (
	"time"

	"gorm.io/gorm"
)

type Transaction struct {
	gorm.Model
	JobID         uint    `json:"job_id"`
	ClientID      uint    `json:"client_id"`
	FreelancerID  uint    `json:"freelancer_id"`
	Amount        float64 `json:"amount"`
	Status        string  `json:"status"`         // "pending", "paid", "released", "cancelled"
	PaymentRef    string  `json:"payment_ref"`    // Midtrans/Xendit invoice ID
	PaymentMethod string  `json:"payment_method"` // "qris", "va", etc.
	PaidAt        *time.Time
	ReleasedAt    *time.Time
}
