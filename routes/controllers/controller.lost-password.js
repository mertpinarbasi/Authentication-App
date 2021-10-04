const userModel = require('../../models/User');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const sgMail = require('@sendgrid/mail');

const { SENDGRID_API_KEY } = require('../../config/keys');
sgMail.setApiKey(SENDGRID_API_KEY);

const postLostPassword = async (req, res) => {
	const { email } = req.body;

	const userFound = await userModel.findOne({ email });
	if (!userFound) {
		return res.render('not-found', { email });
		// return res.json({ status: 'error', error: 'User not found ! ' });
	} else {
		const newPassword = crypto.randomBytes(4).toString('hex').toUpperCase();

		const sgMail = require('@sendgrid/mail');
		const msg = {
			from: 'login-app-verify@outlook.com',
			to: 'mpinarbasi35@gmail.com',
			subject: 'Login-App Lost Password ',
			html: `<h2>Hi , ${userFound.name} ${userFound.surname} .
        <h3>Password lost request has come for  ${userFound.email}. </h3> 
        <h3> Here is your new password to login : ${newPassword}</h3>`
		};
		sgMail
			.send(msg)
			.then(() => {
				console.log('Lost password request email send');
			})
			.catch((error) => {
				console.error(error);
			});
		let message = null;
		let isSend = true;
		try {
			const hashedPassword = await bcrypt.hash(newPassword, 8);

			userFound.password = hashedPassword;

			await userFound.save();
			message = 'Your new password is sent to your email!';
		} catch (error) {
			const errorJSON = JSON.stringify(error);
			message = errorJSON;
			isSend = false;
		}

		res.render('lost-password', { message, isSend });
	}
};
module.exports = postLostPassword;
