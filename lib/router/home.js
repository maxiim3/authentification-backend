const express = require("express")
const router = express.Router()
const {title, content} = require("../views/pages/home")
const template = require("../views/templates/template")

router.get("/", (req, res) => {
	res.send(template(title, content))
	console.log(`Root Route initiated at ${"/"}`)
})

module.exports = router
