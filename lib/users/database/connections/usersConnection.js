const {createConnection} = require("mongoose")
const {selectDatabase, database} = require("../../../selectDatabase")

module.exports.usersConnection = createConnection(selectDatabase(database.users), {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
