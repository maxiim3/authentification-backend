const tokenValidation = require("../middleware/tokenValidation")
const userController = require("../controller/userController")
const express = require("express")
const router = express.Router()

router.get("/", userController.getUsers)

router.get("/me", tokenValidation.authorize, userController.getUserProfile)

router.post("/", userController.createUser)

module.exports = router