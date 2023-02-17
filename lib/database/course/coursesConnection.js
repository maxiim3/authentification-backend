const {createConnection} = require("mongoose")
const {selectDatabase, database} = require("../utils/selectDatabase")

module.exports.coursesConnection = createConnection(selectDatabase(database.courses), {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})