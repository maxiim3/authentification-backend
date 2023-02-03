const express = require("express")
const helmet = require("helmet")
const dotenv = require("dotenv")
const cors = require("cors")
const {
	connect,
	Schema,
	model, Model,
} = require("mongoose")
const {courses} = require("./mocked")

const app = express()
app.use(express.json())
app.use(helmet())
app.use(cors())
dotenv.config()


// Connect to MongoDB
connect(process.env.MONGO_URL).then(() => {
	console.log("connected")
}).catch(err => {
	console.log("something went wrong", err)
})

// Create a schema
const courseSchema = new Schema({
									title: {
										type: String,
										required: true,
										minLength: 3,
										maxLength: 220,
									},
									author: {
										type: String,
										required: true,
										minLength: 3,
										maxLength: 220,
									},
									price: {
										type: Number,
										required: true,
										min: 1,
										max: 100,
									},
								})

// Create a model
const Course = model("courses", courseSchema)

// Create a new course
async function createNewCourse({title, author, price}) {
	const course = new Course({title, author, price})

	const result = await course.save()
	return result
}

// Reset Database
// async function resetDb() {
// 	await Course.deleteMany({})
// }

// resetDb().then(() => {
// 	console.log("Database Reset")
// 	// Populate the database
// 	courses.forEach(course => createNewCourse(course).then(() => console.log(`${course.title} - Successfully added to the Db`)))
// })

// Get all courses from the database
async function getAllCourses() {
	const courses = await Course.find().sort({price: 1})
	return courses
}

async function findCourseByTitle(title) {
	const course = await Course.find({title: {$regex: `.*${title}.*`, $options: "i"}})
	// console.log(course)
	return course
}

const updateCourse = async (title, prop, value) => {
	const updatedCourse = await Course.updateOne({
													 title: {
														 $regex: `.*${title}.*`,
														 $options: "i",
													 },
												 }, {$set: {[prop]: value}})
	return updatedCourse
}

// printCourses().then()

// Root route
app.get("/", (req, res) => {
	res.send("<h1>Hello World!</h1>")
	console.log(`Root Route initiated at ${"/"}`)
})
// Get all courses
app.get("/courses", async (req, res) => {
	const courses = await getAllCourses()

	res.send(courses) // Send the courses from the database to the client
	console.log(`Courses Available at ${"/courses"}`)
})

// Get a course by title
app.get("/courses/:title", async (req, res) => {
	const title = req.params.title
	const course = await findCourseByTitle(title)
	if (!course) return res.status(404).send("Course not found")
	res.send(course) // Send the courses from the database to the client
	console.log(`Courses Available at ${"/courses"}`)
})


// Post a new course
app.post("/courses", async (req, res) => {
	const course = {
		title: req.body.title,
		author: req.body.author,
		price: req.body.price,
	}
	const newCourse = await createNewCourse(course)
	res.send(newCourse)
	console.log("New Course added")
})


// Update a course
app.patch("/courses/:title", async (req, res) => {
	const title = req.params.title

	const query = req.query
	const keys = Object.keys(req.query)

	keys.forEach(key => updateCourse(title, key, query[key]).then())

	res.send("Course Updated")
})


app.listen(process.env.PORT || 3001, () => {
	console.log(`App listening on port ${process.env.PORT || 3001}!`)
})