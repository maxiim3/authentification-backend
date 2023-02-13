const template = require("../views/templates/template")
const {title, content} = require("../views/pages/api")

const express = require("express")
const router = express.Router()
router.get(`/`, async (req, res) => {
	res.send(template(title, content))
})

module.exports = router
