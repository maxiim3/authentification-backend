const express = require("express")
const router = express.Router()
const apiController = require("../controller/apiController")
const {checkForJWT} = require("../database/user/userSchema")

checkForJWT()

router.get("/", apiController.getUser)

module.exports = router
