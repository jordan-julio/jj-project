package routes

import (
	"github.com/jordan-julio/jj-project/backend/controllers"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	api := r.Group("/api")
	{
		api.GET("/health", controllers.HealthCheck)
	}
}
