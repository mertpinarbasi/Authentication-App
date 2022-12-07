const mongoose = require('mongoose');
require('mongoose-type-email');

const otpModelSchema = new mongoose.Schema({
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true,

    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: { type: Date, default: Date.now(), index: { expires: 60000 } }

}, { timestamps: true })

const otpModel = mongoose.model('otpModelSchema', otpModelSchema);
module.exports = otpModel;
