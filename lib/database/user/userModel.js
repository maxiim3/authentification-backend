const {UserSchema} = require("./userSchema")
const {usersConnection} = require("./usersConnection")

module.exports.UserModel = usersConnection.model("users", UserSchema)
