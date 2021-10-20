const userModel = require('../../models/User');
const moment = require('moment');
const { randomUUID } = require('crypto');

const sgMail = require('@sendgrid/mail');
const { SENDGRID_API_KEY } = require('../../config/keys');
sgMail.setApiKey(SENDGRID_API_KEY);
// New verification email will be sent to the user when the latest one expired.
// Hence , a new email token will be created and the user's account can be verified.
const postResendVerification = async (req, res) => {
	const { email } = req.body;
	const user = await userModel.findOne({ email });

	const today = moment();
	const tomorrow = moment(today).add(1, 'days');

	const newEmailToken = {
		token: randomUUID(),
		createdAt: today,
		expiresAt: tomorrow
	};
	user.emailToken = newEmailToken;
	await user.save();
	const msg = {
		from: 'login-app-verify@outlook.com',
		to: email,
		subject: 'Login-App New Verification Code ',
		html: `<h2>Hi , ${user.name} ${user.surname} ! </h2>
        <h2>Thanks for registering to login-app for ${user.email}. </h2>
        <h3> Your latest verification code has expired </h3>
        <h3> Here is your new  verification code  : ${user.emailToken.token}</h3>`
	};
	sgMail
		.send(msg)
		.then(() => {
			console.log('New verification code send');
		})
		.catch((error) => {
			console.error(error);
		});
	const resendVerificationMessage = 'Now you can login with  your new verification code ! ';
	res.render('verification', { resendVerificationMessage });
};

module.exports = postResendVerification;
