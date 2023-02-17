const express = require("express")
const {checkForJWT} = require("../../users/database/models/userModel")
const router = express.Router()
const apiController = require("../controller/apiController")

checkForJWT()

router.get("/", apiController.getUser)

module.exports = router
