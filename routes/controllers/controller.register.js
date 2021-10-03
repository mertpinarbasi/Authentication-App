const bcrypt = require('bcryptjs');

const crypto = require('crypto');

const userModel = require('../../models/User');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
	service: 'hotmail',
	auth: {
		user: 'login-app-verify@outlook.com',
		pass: 'verifyMailer'
	}
});
const postRegister = async (req, res) => {
	const { name, surname, email, password } = req.body;

	const cryptedPassword = await bcrypt.hash(password, 8);
	let errors = [];
	if (!name || !surname || !email || !password) {
		errors.push({ fail: 'All information must be filled' });
	}
	if (password.length < 5) {
		errors.push({ fail: 'Your password must be longer than 5 characters' });
	}
	if (errors.length > 0) {
		res.render('register', { errors, name, surname, email, password });
	} else {
		try {
			const emailToken = {
				token: crypto.randomBytes(4).toString('hex').toUpperCase(),
				createdAt: Date.now(),
				expiresAt: Date.now() + 8640000
			};
			const newUser = await userModel.create({
				name: name,
				surname: surname,
				email: email,
				password: cryptedPassword,
				isVerified: false,
				emailToken: emailToken
			});

			// e-email verification
			const emailOptions = {
				from: 'login-app-verify@outlook.com',
				to: 'mpinarbasi35@gmail.com',
				subject: 'Login-App Verification Code ',
				html: `<h2>${newUser.name} ${newUser.surname} ! Thanks for registering to login-app. </h2>
				<h3>Please verify your email to complete registration</h3> 
				<h3> Your verification code is  : ${newUser.emailToken.token}</h3>`
			};

			transporter.sendMail(emailOptions, (error, info) => {
				if (error) {
					console.log(error);
					return;
				}
				console.log('Sent : ' + info.response);
			});

			return res.redirect('/authUser/verification');
		} catch (error) {
			console.log(error);
			if (error.code === 11000) {
				//  duplication error
				return res.json({ status: 'error', error: 'The given email is already in use ' });
			} else {
				return res.json(error);
			}
		}
	}
};
module.exports = postRegister;
