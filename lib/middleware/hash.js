const bcrypt = require("bcrypt")

const run = async () => {
	const salt = await bcrypt.genSalt(10) // 10 is the number of rounds, the higher the number the more secure the password
	const hashed = await bcrypt.hash("1234", salt) // 1234 is the password, salt is the salt, the salt is generated in the previous line
}

run().catch()
