const {User, validate, validatePassword} = require("../models/user")
const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const router = express.Router()
const dotenv = require("dotenv")

dotenv.config()
if (!process.env.JWT) {
	console.error("FATAL ERROR: jtwPrivateKey is not defined")
	process.exit(1) // 0 means success, 1 means failure
}

router.get("/", async (req, res) => {
	const users = await User.find()

	res.send(users)
})
router.post("/", async (req, res) => {
	// 1. Validate the request body
	const {error} = validate(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	// 2. Check if the email is already registered
	const pw = validatePassword(req.body.password)
	if (!pw) return res.status(400).send("password is not valid")

	// 3. Check if the email is already registered
	let user = await User.findOne({email: req.body.email})
	if (user) return res.status(400).send("This email address is already registered")

	// 4. Create a new user
	user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	})
	const salt = await bcrypt.genSalt(10)
	user.password = user.password && (await bcrypt.hash(user.password, salt))

	// 5. Save the user to the database
	await user.save()

	// 6. Generate a JWT
	const token = await jwt.sign({_id: user._id}, process.env.JWT) // jwtPrivateKey is a private key

	// 7. Send the user to the client
	res.header("x-auth-token", token) // set the header with the token than can be debugged in https://jwt.io/#debugger-io
		.send({
			_id: user._id,
			name: user.name,
			email: user.email,
		}) // send the user object to the client
})

module.exports = router
