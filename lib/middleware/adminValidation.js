// Validating existing user, via email and password
const Joi = require("joi")

module.exports.authorize = function (req, res, next) {
	if (!req.user.isAdmin) return res.status(403).send("Access denied.")

	return next()
}
