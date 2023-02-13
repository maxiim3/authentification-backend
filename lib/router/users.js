const {UserModel, validateUser, validatePassword, checkForJWT} = require("../models/userModel")
const {authorize} = require("../middleware/authorize")
const express = require("express")
const router = express.Router()

const bcrypt = require("bcrypt")

const dotenv = require("dotenv")
dotenv.config()

checkForJWT()

router.get("/", async (req, res) => {
	const users = await UserModel.find()

	res.send(users)
})

router.get("/me", authorize, async (req, res) => {
	const user = await UserModel.findById(req.user._id).select("-password")
	res.send(user)
	console.log(user.isAdmin ? `${user.name} is admin` : `${user.name} is not admin`)
})

router.post("/", async (req, res) => {
	// 1. Validate the request body
	const {error} = validateUser(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	// 2. Check if the email is already registered
	const pw = validatePassword(req.body.password)
	if (!pw) return res.status(400).send("password is not valid")

	// 3. Check if the email is already registered
	let user = await UserModel.findOne({email: req.body.email})
	if (user) return res.status(400).send("This email address is already registered")

	// 4. Create a new user
	user = new UserModel({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	})
	const salt = await bcrypt.genSalt(10)
	user.password = user.password && (await bcrypt.hash(user.password, salt))

	// 5. Save the user to the database
	await user.save()

	// 6. Generate a JWT
	const token = await user.generateAuthToken()

	// 7. Send the user to the client
	return res
		.header("x-auth-token", token) // set the header with the token than can be debugged in https://jwt.io/#debugger-io
		.send({
			_id: user._id,
			name: user.name,
			email: user.email,
		}) // send the user object to the client
})

module.exports = router
