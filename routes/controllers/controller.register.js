const bcrypt = require('bcryptjs');
const { randomUUID } = require('crypto');
const moment = require('moment');
const userModel = require('../../models/User');

const sgMail = require('@sendgrid/mail');
const { SENDGRID_API_KEY } = require('../../config/keys');
sgMail.setApiKey(SENDGRID_API_KEY);

const postRegister = async (req, res) => {
	// isEmailInUse for detect if the email is already in use.
	let isEmailInUse = false;
	// The errors in the registration phase will be stored in the errors array
	// to prevent invalid inputs.
	let errors = [];

	const { name, surname, email, password } = req.body;
	// Given password will be hashed to store in the database.
	const cryptedPassword = await bcrypt.hash(password, 8);

	// Error detection phase statements .

	// To check if any input is empty.
	if (!name || !surname || !email || !password) {
		errors.push({ fail: 'All information must be filled' });
	}
	// Given password must be at least 5 characters
	if (password.length < 5) {
		errors.push({ fail: 'Your password must be longer than 5 characters' });
	}
	// If any error has occurred , they will be shown in the page.
	if (errors.length > 0) {
		res.render('register', { errors, name, surname, email, password });
	} else {
		try {
			const today = moment();
			const tomorrow = moment(today).add(1, 'days');
			// If registration is completed , a verification message will be sent
			// to the user that contains a verification code
			// which is stored  as a "token" in the database.
			const emailToken = {
				token: randomUUID(),
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
				to: email,
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

			return res.render('verification');
		} catch (error) {
			console.log(error);
			// Since the email key is described as an unique key in the user schema,
			// if the given email is already in use the mongodb will create duplication
			// error that is "11000"
			if (error.code === 11000) {
				isEmailInUse = true;
				return res.render('register', { isEmailInUse });
			} else {
				return res.json(error);
			}
		}
	}
};
module.exports = postRegister;
