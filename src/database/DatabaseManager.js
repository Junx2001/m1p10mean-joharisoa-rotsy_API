const mongoose = require('mongoose');

const dbURI = process.env.DB_URI;
mongoose.set("strictQuery", false);
mongoose
	.connect(dbURI)
	.then(() => console.log("Database Connected"))
	.catch((err) => console.log(err));

mongoose.Promise = global.Promise;


exports.mongo = mongoose;