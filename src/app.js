const express = require("express")
const config = require("../config.json")
const helmet = require("helmet")
const cors = require("cors")
const courses = require("./router/courses")
const users = require("./router/users")
const auth = require("./router/auth")
const home = require("./router/home")
const api = require("./router/api")
const serverless = require("serverless-http")

const app = express()
app.use(express.json())
app.use(helmet())
app.use(cors())

app.use(config.paths.root, home)
app.use(config.paths.api.root, api)
app.use(config.paths.api.auth, auth)
app.use(config.paths.api.users, users)
app.use(config.paths.api.courses, courses)

app.listen(process.env.PORT || 3001, () => {
	console.log(`App listening on port ${process.env.PORT || 3001}!`)
})

// serverless(app)
