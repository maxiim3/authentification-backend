const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
	res.send("Some user" + " : " + process.env.MONGO_USER)
})

module.exports = router
