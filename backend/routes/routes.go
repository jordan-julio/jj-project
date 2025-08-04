package routes

import (
	"github.com/gin-gonic/gin"
	"jjproject.local/backend/controllers"
	"jjproject.local/backend/middleware"
)

func RegisterRoutes(r *gin.Engine) {
	//
	homeroutes := r.Group("/")
	homeroutes.GET("/", func(c *gin.Context) {
		endpoints := r.Routes()
		routeList := make([]gin.H, 0, len(endpoints))

		for _, route := range endpoints {
			routeList = append(routeList, gin.H{
				"method": route.Method,
				"path":   route.Path,
			})
		}

		c.JSON(200, gin.H{
			"available_routes": routeList,
		})
	})
	api := r.Group("/api")

	// Health check
	api.GET("/health", controllers.HealthCheck)

	// Auth
	api.POST("/register", controllers.Register)
	api.POST("/login", controllers.Login)

	// Authenticated routes
	auth := api.Group("/")
	auth.Use(middleware.AuthMiddleware())
	{
		// Freelancer Profile
		auth.GET("/profile", controllers.GetMyProfile)
		auth.PUT("/profile", controllers.UpdateProfile)
		auth.GET("/freelancers", controllers.ListFreelancers)
		auth.GET("/freelancers/:id", controllers.GetFreelancerByID)

		// Jobs
		auth.GET("/jobs", controllers.ListJobs)
		auth.POST("/jobs", controllers.CreateJob)
		auth.GET("/jobs/:id", controllers.GetJobByID)
		auth.DELETE("/jobs/:id", controllers.DeleteJob)

		// Reviews
		auth.POST("/reviews", controllers.CreateReview)
		auth.GET("/freelancers/:id/reviews", controllers.GetReviewsForFreelancer)

		// Escrow / Payments
		auth.POST("/escrow/initiate", controllers.InitiateEscrow)
		auth.POST("/escrow/release", controllers.ReleaseEscrow)
		auth.POST("/escrow/webhook", controllers.HandlePaymentWebhook)
	}

	// Admin routes (optional for future)
	admin := api.Group("/admin")
	admin.Use(middleware.AdminMiddleware())
	{
		admin.GET("/jobs", controllers.AdminListJobs)
		admin.DELETE("/freelancers/:id", controllers.AdminDeleteFreelancer)
		admin.POST("/flag", controllers.AdminFlagContent)
	}
}
