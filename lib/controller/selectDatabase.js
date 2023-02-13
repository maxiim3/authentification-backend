const dotenv = require("dotenv")
dotenv.config()

module.exports.selectDatabase = DB_NAME =>
	`mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASSWORD}@sestini.gwe6jil.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

module.exports.database = {
	auth: "auth",
	users: "users",
	courses: "courses",
}
