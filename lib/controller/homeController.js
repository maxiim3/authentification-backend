module.exports.getHomePage = (req, res) => {
	res.send("Server is running.")
}

module.exports.getHomePageAndGreetUser = (req, res) => {
	res.send("Server is running." + " Welcome " + req.params.name)
}
