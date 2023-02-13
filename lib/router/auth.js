const {validateAuth} = require("../models/authModel")
const {UserModel, checkForJWT} = require("../models/userModel")

const bcrypt = require("bcrypt")

const express = require("express")
const router = express.Router()

const dotenv = require("dotenv")
dotenv.config()

checkForJWT()

router.post("/", async (req, res) => {
	// 1. Evaluate the request body | using Joi Schema
	const {error} = validateAuth(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	// 2. Check if the email is already registered
	let user = await UserModel.findOne({email: req.body.email})
	if (!user) return res.status(400).send("Invalid Email or Password")

	// 3. Validate the password | Compare the password with the hashed password
	const validPassword = await bcrypt.compare(req.body.password, user.password) // returns true or false
	if (!validPassword) return res.status(400).send("Invalid Email or Password")

	// 4. Generate a JWT
	const token = await user.generateAuthToken()
	console.log(token)

	// 5. Return the token to the client
	return res
		.header("x-auth-token", token) // set the header with the token than can be debugged in https://jwt.io/#debugger-io
		.send({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: token,
		}) // send the user object to the client
})

module.exports = router
