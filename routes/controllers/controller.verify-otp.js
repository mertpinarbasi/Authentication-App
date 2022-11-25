const Otp = require('../../models/otpModel');
const bcrypt = require("bcryptjs");

const verifyOtp = async (req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;


    const otpHolder = await Otp.find({
        number: req.body.email
    })
    if (otpHolder.length === 0) return res.status(400).send("You have used an expired OTP!");

    const rightOtpFind = otpHolder[otpHolder.length - 1];
    const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);

    if (rightOtpFind.email === req.body.email && validUser) {
        const OTPdelete = await Otp.deleteMany({ email: rightOtpFind.email })

        res.render('success', { name, surname, email })
        // return res.status(200).send({ name: name, surname: surname, email: email, message: "User is verified!" })
    }
    else {
        return res.status(400).send("Your OTP was wrong!")
    }
}
module.exports = verifyOtp;