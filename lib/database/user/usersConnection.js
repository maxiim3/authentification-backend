const {createConnection} = require("mongoose")
const {selectDatabase, database} = require("../utils/selectDatabase")

module.exports.usersConnection = createConnection(selectDatabase(database.users), {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
