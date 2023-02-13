const {createConnection} = require("mongoose")
const {selectDatabase, database} = require("./selectDatabase")

module.exports.authConnetion = createConnection(selectDatabase(database.auth), {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
