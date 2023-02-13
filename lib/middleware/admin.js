// 401 Unauthorized --> Invalid JWT
// 403 Forbidden --> Valid JWT, but not authorized role

module.exports.admin = function (req, res, next) {
	if (!req.user.isAdmin) return res.status(403).send("Access denied.")

	return next()
}
