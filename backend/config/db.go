package config

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"jjproject.local/backend/models"
)

var DB *gorm.DB

func ConnectDB() {
	dsn := os.Getenv("DATABASE_URL")
	user := os.Getenv("DATABASE_USER")
	pass := os.Getenv("DATABASE_PASSWORD")
	name := os.Getenv("DATABASE_NAME")

	// Fallback if DATABASE_URL is not set
	if dsn == "" {
		if user == "" || pass == "" || name == "" {
			log.Fatal("Missing DB credentials: DATABASE_USER, DATABASE_PASSWORD, or DATABASE_NAME")
		}
		dsn = fmt.Sprintf("host=localhost user=%s password=%s dbname=%s port=5432 sslmode=disable", user, pass, name)
	}

	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("❌ Failed to connect to database: %v", err)
	}

	err = DB.AutoMigrate(&models.User{})
	if err != nil {
		log.Fatalf("❌ Failed to migrate User model: %v", err)
	}
	log.Println("✅ Database connection established successfully")
}
