const express = require("express")
const router = express.Router()
const homeController = require("../controller/homeController")

router.get("/", homeController.getHomePage)

router.get("/hello/:name", homeController.getHomePageAndGreetUser)

module.exports = router
