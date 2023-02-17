const Joi = require("joi")
const passwordValidator = require("password-validator")

module.exports.validateUser = user => {
	const JoiSchema = Joi.object({
									 name: Joi.string().min(3).max(220).trim().required(),
									 email: Joi.string().min(5).max(255).required().email(),
									 password: Joi.string().min(8).max(1024).required(),
								 })

	return JoiSchema.validate(user)
}

module.exports.validatePassword = password => {
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


