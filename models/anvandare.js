const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const AnvandareSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	}
});

AnvandareSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Anvandare', AnvandareSchema);
