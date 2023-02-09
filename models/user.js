const {model, Schema} = require("mongoose")
const passwordValidator = require("password-validator")

const Joi = require("joi")

const User = model(
	"users",
	new Schema({
		name: {
			type: String,
			required: true,
			minLength: 3,
			maxLength: 220,
			trim: true,
			lowercase: true,
		},
		email: {
			type: String,
			required: true,
			minLength: 5,
			maxLength: 255,
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			minLength: 8,
			maxLength: 1024,
			trim: true,
		},
	})
)

const validateUser = user => {
	const JoiSchema = Joi.object({
		name: Joi.string().min(3).max(220).trim().required(),
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(8).max(1024).required(),
	})

	return JoiSchema.validate(user)
}

const validatePassword = password => {
	const PWSchema = new passwordValidator()
	PWSchema.is()
		.min(8)
		.is()
		.max(1024)
		.has()
		.uppercase(1)
		.has()
		.lowercase(1)
		.has()
		.digits(1)
		.has()
		.not()
		.spaces()
		.is()
		.not()
		.oneOf(["Passw0rd", "Password123", "12345", "azerty", "qwerty"])

	return PWSchema.validate(password)
}

module.exports.User = User
module.exports.validate = validateUser
module.exports.validatePassword = validatePassword
