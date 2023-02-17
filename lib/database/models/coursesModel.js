const courseSchema = require("./courseSchema")
const {coursesConnection} = require("../connections/coursesConnection")

module.exports.Model = coursesConnection.model("courses", courseSchema.Schema)
