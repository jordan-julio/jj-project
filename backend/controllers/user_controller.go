package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"jjproject.local/backend/config"
	"jjproject.local/backend/models"
)

func HealthCheck(c *gin.Context) {
	c.JSON(200, gin.H{
		"status": "OK",
	})
}

func GetUsers(c *gin.Context) {
	var users []models.User
	result := config.DB.Find(&users)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, users)
}
