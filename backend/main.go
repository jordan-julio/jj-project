package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"jjproject.local/backend/config"
	"jjproject.local/backend/routes"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	config.ConnectDB()

	r := gin.Default()
	routes.RegisterRoutes(r)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}
	r.Run(":" + port)
}
