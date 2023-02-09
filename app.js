const express = require("express")
const config = require("./config.json")
const helmet = require("helmet")
const dotenv = require("dotenv")
const cors = require("cors")
const {connect} = require("mongoose")
const users = require("./router/users")
const auth = require("./router/auth")
const home = require("./router/home")
const api = require("./router/api")

dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(cors())

// Connect to MongoDB
connect(process.env.MONGO_URL)
	.then(() => {
		console.log("connected")
	})
	.catch(err => {
		console.log("something went wrong", err)
	})

app.use(config.paths.root, home)
app.use(config.paths.api.root, api)
app.use(config.paths.api.auth, auth)
app.use(config.paths.api.users, users)

app.listen(process.env.PORT || 3001, () => {
	console.log(`App listening on port ${process.env.PORT || 3001}!`)
})
