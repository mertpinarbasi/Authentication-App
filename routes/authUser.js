const express = require('express');
const bcrypt = require('bcryptjs');
const authUser = express.Router();
const userModel = require('../models/User');

const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config/keys').JWT_SECRET;
const crypto = require('crypto');

// email verification
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	service: 'hotmail',
	auth: {
		user: 'login-app-verify@outlook.com',
		pass: 'verifyMailer'
	}
});

// login
authUser.get('/login', (req, res) => {
	res.render('login');
});
// register
authUser.get('/register', (req, res) => {
	res.render('register');
});

authUser.get('/change-password', (req, res) => {
	res.render('change-password');
});

authUser.post('/register', async (req, res) => {
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
			if (error.code === 11000) {
				//  duplication error
				return res.json({ status: 'error', error: 'The given email is already in use ' });
			} else {
				return res.json({ status: 'error ', error: error });
			}
		}
	}
});
authUser.get('/verification', async (req, res) => {
	res.render('verification');
});
authUser.post('/verification', async (req, res) => {
	try {
		const { token } = req.body;
		console.log(token);
		const user = await userModel.findOne({ 'emailToken.token': token });
		if (user) {
			user.isVerified = true;
			await user.save();

			res.redirect('/authUser/login');
		} else {
			res.redirect('/authUser/register');
		}
	} catch (error) {
		console.log(error);
	}
});
authUser.post('/login', async (req, res) => {
	const { email, password } = req.body;

	const userFound = await userModel.findOne({ email }).lean();

	if (!userFound) {
		return res.render('not-found', { email });
		// return res.json({ status: 'error', error: 'User not found ! ' });
	}
	if (await bcrypt.compare(password, userFound.password)) {
		const { name, surname, isVerified } = userFound;
		if (!isVerified) {
			return res.json({ status: 'error', data: 'Please verify your account' });
		}
		const token = jwt.sign({ id: userFound._id, email: userFound.email }, JWT_SECRET);

		res.render('success', { name, surname, email });
	} else {
		return res.json({ status: 'error', data: 'Your password is incorrect' });
	}
});

authUser.post('/change-password', async (req, res) => {
	const { newPassword } = req.body;
	const token = localStorage.getItem(token);

	try {
		const verified = jwt.verify(token, JWT_SECRET);
		console.log(verified);
		const _id = verified.id;
		const hashedPassword = await bcrypt.hash(newPassword, 8);
		await userModel.updateOne({ _id }, { $set: { password: hashedPassword } });
		res.json({ status: 'ok' });
	} catch (error) {
		console.log(error);
		res.json({ status: error });
	}
});
module.exports = authUser;
