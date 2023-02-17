const {UserModel, checkForJWT} = require("../database/models/userModel")
const authModel = require("../database/models/authModel")
const bcrypt = require("bcrypt")

checkForJWT()

module.exports.loginUser = async serviceData => {
	try {
		// 1. Evaluate the request body | using Joi Schema
		const validateBodyRequest = await authModel.validateSchema(serviceData)
		if (validateBodyRequest.error) throw new Error(validateBodyRequest.error.details[0].message)

		// 2. Check if the email is already registered
		const user = await UserModel.findOne({email: serviceData.email})
		if (!user) throw new Error("Invalid Email or Password")

		// 3. Validate the password | Compare the password with the hashed password
		const validPassword = await bcrypt.compare(serviceData.password, user.password) // returns true or false
		if (!validPassword) throw new Error("Invalid Email or Password")

		// 4. Generate a JWT
		const token = await user.generateAuthToken()

		// 5. Return the token to the client
		return {user, token}
	} catch (error) {
		console.error("Error in authService.js", error)
		throw new Error(error)
	}
}
