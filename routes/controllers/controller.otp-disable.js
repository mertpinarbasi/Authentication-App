const userModel = require('../../models/User');
const bcrypt = require("bcryptjs");
const moment = require("moment");

const disableOtp = async (req, res) => {
    const { otpDisableTime, email } = req.body;



    const user = await userModel.findOne({
        email: req.body.email
    })

    if (!user) return res.status(400).send("User not found");



    if (user.email === req.body.email) {
        try {
            console.log(otpDisableTime);
            const userUpdate = await user.updateOne({ otpDisableTime: moment(moment()).add(otpDisableTime, 'minutes').toDate() })
        }
        catch (err) {
            console.log(err);
        }


        return res.status(200).send({ email: email, message: "OTP Disabled!" })
    }
    else {
        return res.status(400).send("Your OTP was wrong!")
    }
}
module.exports = disableOtp;