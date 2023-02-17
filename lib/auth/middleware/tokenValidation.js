const jwt = require("jsonwebtoken")

const dotenv = require("dotenv")
dotenv.config()

// auth stands here for authorization
module.exports.authorize = function (req, res, next) {
	const token = req.header("x-auth-token")
	if (!token) return res.status(401).send("Access denied. No token provided")

	try {
		// will get the payload we defined in the user model.generateAuthToken()
		// and will set the decoded token to req.user
		req.user = jwt.verify(token, process.env.JWT)
		next()
	} catch (ex) {
		res.status(400).send("Invalid token.")
	}
}

// We add a method to the UserSchema. We check if the JWT is defined in the environment variables.
// if not, we throw an error and exit the process
module.exports.checkForJWT = () => {
	if (!process.env.JWT) {
		console.error("FATAL ERROR: jtwPrivateKey is not defined")
		process.exit(1) // 0 means success, 1 means failure
	}
}