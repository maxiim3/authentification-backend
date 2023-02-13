const {CourseModel, validateCourse} = require("../models/coursesModel")
const {authorize} = require("../middleware/authorize")
const {admin} = require("../middleware/admin")
const express = require("express")
const router = express.Router()

const dotenv = require("dotenv")
dotenv.config()

router.get("/", async (req, res) => {
	const courses = await CourseModel.find()
	return res.send(courses)
})

// we pass the auth middleware function as a second argument to the route handler
router.post("/", authorize, async (req, res) => {
	// we need to read the token from the header
	// we store the token in a variable "token"
	// if !token response status(401).send("Access denied. No token provided.")
	// we should create a middleware function to check for the token

	// 1. Validate the request body
	const {error} = validateCourse(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	// 3. Check if the course is already registered
	let course = await CourseModel.findOne({title: req.body.title})
	if (course) return res.status(400).send("This course address is already registered")

	// 4. Create a new course
	course = new CourseModel({
		title: req.body.title,
		author: req.body.author,
		tags: req.body.tags,
		price: req.body.price,
	})

	// 5. Save the course to the database
	await course.save()

	// 7. Send the course back to the client
	return res.send({
		_id: course._id,
		title: course.title,
		author: course.author,
		price: course.price,
		tags: course.tags,
	})
})

router.delete("/:id", authorize, admin, async (req, res) => {
	const course = await CourseModel.findByIdAndRemove(req.params.id)
	if (!course) return res.status(404).send("The course with the given ID was not found.")

	return res.send(course)
})

module.exports = router
