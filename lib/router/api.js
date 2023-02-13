const express = require("express")
const {checkForJWT} = require("../models/userModel")
const router = express.Router()

checkForJWT()

router.get("/", (req, res) => {
	res.send("Some user" + " : " + process.env.MONGO_USER)
})

module.exports = router
