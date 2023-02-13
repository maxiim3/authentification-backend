const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
	res.send("Server is running")
})

router.get("/hello/:name", (req, res) => {
	res.send("Server is running." + " Welcome " + req.params.name)
})

router.get("/api", (req, res) => {
	res.send("Some user" + " : " + process.env.MONGO_USER)
})

module.exports = router
