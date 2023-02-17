const courseSchema = require("../schema/courseSchema")
const {coursesConnection} = require("../connections/coursesConnection")

module.exports.Model = coursesConnection.model("courses", courseSchema.Schema)
