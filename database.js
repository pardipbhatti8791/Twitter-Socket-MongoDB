const mongoose = require("mongoose")
mongoose.set("useNewUrlParser", true)
mongoose.set("useUnifiedTopology", true)
mongoose.set("useFindAndModify", false)

class Database {

	constructor() {
		this.connect()
	}

	connect() {
		mongoose.connect("mongodb+srv://gugu:gagudeep1991@twitterclone.de7oh.mongodb.net/twitterClone?retryWrites=true&w=majority")
			.then(() => {
				console.log("database connection successfull")
			})
			.catch(() => {
				console.log("database connection error")
			})
	}
}

module.exports = new Database();
