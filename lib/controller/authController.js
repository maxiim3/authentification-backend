const authService = require("../service/authService")

module.exports.loginUser = async (req, res) => {
	let response = {}

	try {
		const {user, token} = await authService.loginUser(req.body)
		response.status = 200
		response.message = "User successfully logged in"
		response.header("x-auth-token", token) // set the header with the token than can be debugged in https://jwt.io/#debugger-io
		response.header("access-control-expose-headers", "x-auth-token")
		response.body = {
			_id: user._id,
			name: user.name,
			email: user.email,
		}
	} catch (error) {
		console.error("Error in loginUser (authController.js)", error)
		response.status = 400
		response.message = error.message
		response.body = {}
	}

	return res.status(response.status).send(response)
}
