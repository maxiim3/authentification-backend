const express = require("express")
const {checkForJWT} = require("../database/models/userModel")
const router = express.Router()
const apiController = require("../controller/apiController")

checkForJWT()

router.get("/", apiController.getUser)

module.exports = router
