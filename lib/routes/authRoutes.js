const authController = require("../controller/authController")
const express = require("express")
const router = express.Router()

router.post("/", authController.loginUser)

module.exports = router
