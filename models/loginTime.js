const mongoose = require('mongoose');
const loginTimeSchema = new mongoose.Schema({
	loginUser: { type: String, required: true },
	loginTime: { type: Number, required: true },
	loginDate: { type: Date, required: true }
});
const loginTimeModel = mongoose.model('loginTimeSchema', loginTimeSchema);
module.exports = loginTimeModel;
