package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func InitiateEscrow(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Initiate escrow payment (QRIS)"})
}

func HandlePaymentWebhook(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Received payment webhook"})
}

func ReleaseEscrow(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Release escrow to freelancer"})
}
