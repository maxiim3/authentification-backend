const {checkForJWT} = require("../database/user/userSchema")
const {CourseModel} = require("../database/course/coursesModel")

checkForJWT()

module.exports.getAllCourses = async () => {
	try {
		const courses = await CourseModel.find()
		if (!courses) throw new Error("No courses found")
	}
	catch (error) {
		console.error("Error in courseService.js", error)
		throw new Error(error)
	}
}

module.exports.createCourse = async serviceData => {
	try {
		// 1. Validate the request body
		const {error} = CourseModel.validateCourse(serviceData)
		if (error) throw new Error(error.details[0].message)

		// 2. Check if the course is already registered
		const courseAlreadyExists = await CourseModel.findOne({
																  title: serviceData.title,
															  })
		if (courseAlreadyExists) throw new Error("This course address is already registered")

		// 3. Create a new course
		const newCourse = new CourseModel({
											  title: serviceData.title,
											  author: serviceData.author,
											  tags: serviceData.tags,
											  price: serviceData.price,
										  })

		// 4. Save the course to the database
		await newCourse.save()

		// 5. Send the course back to the client
		return newCourse
	}
	catch (error) {
		console.error("Error in courseService.js", error)
		throw new Error(error)
	}
}

module.exports.deleteCourse = async serviceData => {
	try {
		// 1. check if the course exists in the database | if it does, delete it
		const course = await CourseModel.findByIdAndRemove(serviceData.id)
		// 2. if it doesn't exist, throw an error
		if (!course) throw new Error("The course with the given ID was not found.")
		// 3. send the course back to the client
		return course
	}
	catch (error) {
		console.error("Error in courseService.js", error)
		throw new Error(error)
	}
}
