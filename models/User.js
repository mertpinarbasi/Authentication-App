const mongoose = require('mongoose');
require('mongoose-type-email');

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	surname: { type: String, required: true },
	email: { type: mongoose.SchemaTypes.Email, required: true, unique: true },
	password: { type: String, required: true }
});
const userModel = mongoose.model('userSchema', userSchema);
module.exports = userModel;