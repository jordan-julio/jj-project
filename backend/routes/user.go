package routes

import (
	"jjproject.local/backend/controllers"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	api := r.Group("/api")
	{
		api.GET("/health", controllers.HealthCheck)
	}
}
