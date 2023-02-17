const tokenValidation = require("../../auth/middleware/tokenValidation")
const express = require("express")
const userController = require("../controller/userController")
const router = express.Router()

router.get("/", userController.getUsers)

router.get("/me", tokenValidation.authorize, userController.getUserProfile)

router.post("/", userController.createUser)

module.exports = router