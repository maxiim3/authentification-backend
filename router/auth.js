const {User} = require("../models/user")
const express = require("express")
const bcrypt = require("bcrypt")
const Joi = require("joi")
const router = express.Router()

const validate = req => {
	const JoiSchema = Joi.object({
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(8).max(1024).required(),
	})

	return JoiSchema.validate(req)
}
router.post("/", async (req, res) => {
	// 1. Validate the email and password
	const {error} = validate(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	// 2. Check if the email is already registered
	let user = await User.findOne({email: req.body.email})
	if (!user) return res.status(400).send("Invalid Email or Password")

	// 3. Validate the password | Compare the password with the hashed password
	const validPassword = await bcrypt.compare(req.body.password, user.password) // returns true or false
	if (!validPassword) return res.status(400).send("Invalid Email or Password")

	res.send(true)
})

module.exports = router
