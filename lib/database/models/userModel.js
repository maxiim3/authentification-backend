const userSchema = require("./userSchema")
const {usersConnection} = require("../connections/usersConnection")

const dotenv = require("dotenv")
dotenv.config()


module.exports.UserModel = usersConnection.model("users", userSchema.Schema)
