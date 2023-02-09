const express = require("express")
const router = express.Router()
const {title, content} = require("../views/pages/api")
const template = require("../views/templates/template")
router.get(`/`, async (req, res) => {
	res.send(template(title, content))
})

module.exports = router
