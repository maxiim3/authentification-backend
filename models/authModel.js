// Validating existing user, via email and password
const Joi = require("joi")

module.exports.validateAuth = req => {
	const JoiSchema = Joi.object({
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(8).max(1024).required(),
	})

	return JoiSchema.validate(req)
}
