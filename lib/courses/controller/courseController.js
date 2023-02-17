const courseService = require("../service/courseService")
const dotenv = require("dotenv")
dotenv.config()

// todo: refactor Database and models

module.exports.getCourses = async (req, res) => {
	let response = {}

	try {
		const courses = await courseService.getAllCourses()
		response.status = 200
		response.message = "Successfully got all courses"
		response.body = courses
	} catch (e) {
		console.error("Error in courseController.js", e)
		response.status = 400
	}
	return res.status(response.status).send(response)
}

module.exports.createCourse = async (req, res) => {
	let response = {}

	try {
		const newCourse = await courseService.createCourse(req.body)
		response.status = 200
		response.message = "Successfully created new course"
		response.body = newCourse
	} catch (error) {
		console.error("Error in courseController.js", error)
		response.status = 400
		response.message = error.message
	}
	return res.status(response.status).send(response)
}

module.exports.deleteCourse = async (req, res) => {
	let response = {}

	try {
		const deletedCourse = await courseService.deleteCourse(req.params)
		response.status = 200
		response.message = "Successfully deleted course"
		response.body = deletedCourse
	} catch (error) {
		console.error("Error in courseController.js", error)
		response.status = 400
		response.message = error.message
	}
	return res.status(response.status).send(response)
}
