const tokenValidation = require("../middleware/tokenValidation")
const adminValidation = require("../middleware/adminValidation")
const courseController = require("../controller/courseController")
const express = require("express")
const router = express.Router()

const dotenv = require("dotenv")
dotenv.config()

router.get("/", courseController.getCourses)

// we pass the auth middleware function as a second argument to the route handler
router.post("/", tokenValidation.authorize, courseController.createCourse)

router.delete(
	"/:id",
	tokenValidation.authorize,
	adminValidation.authorize,
	courseController.deleteCourse
)

module.exports = router
