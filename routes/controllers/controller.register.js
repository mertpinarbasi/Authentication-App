const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const moment = require('moment');
const userModel = require('../../models/User');

const sgMail = require('@sendgrid/mail');
const { SENDGRID_API_KEY } = require('../../config/keys');
sgMail.setApiKey(SENDGRID_API_KEY);

const postRegister = async (req, res) => {
	const { name, surname, email, password } = req.body;
	let isEmailInUse = false;
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
			const today = moment();
			const tomorrow = moment(today).add(1, 'days');
			const emailToken = {
				token: crypto.randomBytes(4).toString('hex').toUpperCase(),
				createdAt: today,
				expiresAt: tomorrow
			};
			const newUser = await userModel.create({
				name: name,
				surname: surname,
				email: email,
				password: cryptedPassword,
				isVerified: false,
				emailToken: emailToken
			});

			const msg = {
				from: 'login-app-verify@outlook.com',
				to: 'mpinarbasi35@gmail.com',
				subject: 'Login-App Verification Code ',
				html: `<h2>Hi , ${newUser.name} ${newUser.surname} ! </h2>
				<h2>Thanks for registering to login-app for ${newUser.email}. </h2>
				<h3>Please verify your email to complete registration</h3> 
				<h3> Your verification code is  : ${newUser.emailToken.token}</h3>`
			};
			sgMail
				.send(msg)
				.then(() => {
					console.log('Register Verification Email Sent');
				})
				.catch((error) => {
					console.error(error);
				});

			return res.redirect('/authUser/verification');
		} catch (error) {
			console.log(error);
			if (error.code === 11000) {
				//  duplication error
				isEmailInUse = true;
				return res.render('register', { isEmailInUse });
				// return res.json({ status: 'error', error: 'The given email is already in use ' });
			} else {
				return res.json(error);
			}
		}
	}
};
module.exports = postRegister;
