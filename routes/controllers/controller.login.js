const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../../config/keys').JWT_SECRET;
const userModel = require('../../models/User');
const loginTimeModel = require('../../models/loginTime');
const moment = require('moment');
const { performance } = require('perf_hooks');

// for time calculation
let startTime = null;
let endTime = null;

// login flags for decide which message should be displayed
let isPasswordCorrect = true;
let isLoginSuccess = false;

const postLogin = async (req, res) => {
	startTime = performance.now();
	const { email, password } = req.body;

	const userFound = await userModel.findOne({ email }).lean();
	// if the given email is invalid
	if (!userFound) {
		return res.render('not-found', { email });
	}
	// encrypted password is going to be compared with the given password value
	if (await bcrypt.compare(password, userFound.password)) {
		const { name, surname, isVerified } = userFound;
		// if user is not verified the account via email code , verification page will be rendered
		if (!isVerified) {
			const emailVerify = false;
			return res.render('login', { emailVerify });
		}
		// JWT token will be created in case of login process is completed.
		// Hence , the user is authorized for specific operations.
		const token = jwt.sign({ id: userFound._id, email: userFound.email }, JWT_SECRET);

		res.render('success', { name, surname, email, token });
		isLoginSuccess = true;
	} else {
		isPasswordCorrect = false;
		res.render('login', { isPasswordCorrect });
	}
	endTime = performance.now();

	const loginTime = (endTime - startTime) / 1000;
	// If login operation completed successfully , it's operation will be logged.
	if (isLoginSuccess) {
		loginTimeModel.create({ loginUser: email, loginTime: loginTime, loginDate: moment() });
		isLoginSuccess = false;
	}
};

module.exports = postLogin;
