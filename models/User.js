const mongoose = require('mongoose');
require('mongoose-type-email');

const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	surname: { type: String, required: true },
	email: { type: mongoose.SchemaTypes.Email, required: true, unique: true },
	password: { type: String, required: true },
	isVerified: { type: Boolean, required: true },
	emailToken: {
		type: {
			token: String,
			createdAt: Date,
			expiresAt: Date
		},
		required: true
	},
	otpDisableTime: { type: Date, required: false },
});
const userModel = mongoose.model('userSchema', userSchema);
module.exports = userModel;
