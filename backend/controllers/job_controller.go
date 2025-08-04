package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func ListJobs(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "List jobs"})
}

func CreateJob(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Create job"})
}

func GetJobByID(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Get job by ID"})
}

func DeleteJob(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Delete job"})
}
