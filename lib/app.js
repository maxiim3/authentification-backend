const express = require("express")
const config = require("../config.json")
const helmet = require("helmet")
const dotenv = require("dotenv")
const cors = require("cors")
const courses = require("./courses/routes/coursesRoutes")
const users = require("./users/routes/usersRoutes")
const auth = require("./auth/routes/authRoutes")
const api = require("./api/routes/apiRoutes")
const home = require("./home/routes/homeRoutes")

dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(cors())

app.use(config.paths.root, home)
app.use(config.paths.api.api, api)
app.use(config.paths.api.auth, auth)
app.use(config.paths.api.users, users)
app.use(config.paths.api.courses, courses)

const DEFAULT_PORT = 7654
app.listen(`${process.env.PORT || DEFAULT_PORT}`, () => {
	console.log(`App listening on port ${process.env.PORT || DEFAULT_PORT}!`)
})
