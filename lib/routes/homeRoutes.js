const homeController = require("../controller/homeController")
const express = require("express")
const router = express.Router()

router.get("/", homeController.getHomePage)

router.get("/hello/:name", homeController.getHomePageAndGreetUser)

module.exports = router
