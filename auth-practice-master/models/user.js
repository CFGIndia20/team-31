const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
	username: String,
	password: String
});

// add methods to UserSchema
// handles hashing/salting, so no need for bcrypt
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);