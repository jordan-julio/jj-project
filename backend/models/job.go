package models

import (
	"time"

	"gorm.io/gorm"
)

type Job struct {
	gorm.Model
	Title       string    `json:"title"`
	Description string    `json:"description"`
	ClientID    uint      `json:"client_id"`
	Budget      float64   `json:"budget"`
	Status      string    `json:"status"` // "open", "in_progress", "completed", etc.
	Location    string    `json:"location"`
	Tags        string    `json:"tags"` // optional: comma-separated
	Deadline    time.Time `json:"deadline"`
}
