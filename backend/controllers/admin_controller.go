package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func AdminListJobs(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Admin: List all jobs"})
}

func AdminDeleteFreelancer(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Admin: Delete freelancer"})
}

func AdminFlagContent(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Admin: Flag content"})
}
