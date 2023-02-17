const Joi = require("joi")
const {Schema} = require("mongoose")
const passwordValidator = require("password-validator")
const {usersConnection} = require("./usersConnection")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const UserSchema = new Schema({
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
								  isAdmin: {
									  type: Boolean,
									  default: false,
								  },
							  })

// We add a method to the UserSchema. We use the function syntax to be able to use the "this" keyword
UserSchema.methods.generateAuthToken = async function () {
	return await jwt.sign({_id: this._id, isAdmin: this.isAdmin}, process.env.JWT)
}

module.exports.UserSchema = UserSchema

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

// We add a method to the UserSchema. We check if the JWT is defined in the environment variables.
// if not, we throw an error and exit the process
module.exports.checkForJWT = () => {
	if (!process.env.JWT) {
		console.error("FATAL ERROR: jtwPrivateKey is not defined")
		process.exit(1) // 0 means success, 1 means failure
	}
}