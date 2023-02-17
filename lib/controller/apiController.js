module.exports.getUser = (req, res) => {
	console.log("$$$$$$$$$$$$$$$$ Test in console")
	res.send("Some user" + " : " + process.env.MONGOUSER)
}