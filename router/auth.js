const {User} = require("../models/user")
const express = require("express")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
const Joi = require("joi")
const jwt = require("jsonwebtoken")
const router = express.Router()

dotenv.config()
if (!process.env.JWT) {
	console.error("FATAL ERROR: jtwPrivateKey is not defined")
	process.exit(1) // 0 means success, 1 means failure
}

const validate = req => {
	const JoiSchema = Joi.object({
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(8).max(1024).required(),
	})

	return JoiSchema.validate(req)
}
router.post("/", async (req, res) => {
	// 1. Evaluate the request body | using Joi Schema
	const {error} = validate(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	// 2. Check if the email is already registered
	let user = await User.findOne({email: req.body.email})
	if (!user) return res.status(400).send("Invalid Email or Password")

	// 3. Validate the password | Compare the password with the hashed password
	const validPassword = await bcrypt.compare(req.body.password, user.password) // returns true or false
	if (!validPassword) return res.status(400).send("Invalid Email or Password")

	// 4. Generate a JWT
	const token = await jwt.sign({_id: user._id}, process.env.JWT) // jwtPrivateKey is a private key

	// 5. Return the token to the client
	res.header("x-auth-token", token) // set the header with the token than can be debugged in https://jwt.io/#debugger-io
		.send({
			_id: user._id,
			name: user.name,
			email: user.email,
		}) // send the user object to the client
})

module.exports = router
