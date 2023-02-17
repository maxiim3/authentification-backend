const {coursesConnection} = require("./coursesConnection")
const {CourseSchema} = require("./courseSchema")

module.exports.CourseModel = coursesConnection.model("courses", CourseSchema)

