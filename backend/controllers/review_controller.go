package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateReview(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Create review"})
}

func GetReviewsForFreelancer(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Get reviews for freelancer"})
}
