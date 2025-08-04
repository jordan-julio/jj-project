package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetMyProfile(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Get my profile"})
}

func UpdateProfile(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Update my profile"})
}

func ListFreelancers(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "List freelancers"})
}

func GetFreelancerByID(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Get freelancer by ID"})
}
