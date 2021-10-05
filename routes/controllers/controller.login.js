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
let isPasswordCorrect = true;
// for store information

let isLoginSuccess = false;
const postLogin = async (req, res) => {
	startTime = performance.now();
	const { email, password } = req.body;

	const userFound = await userModel.findOne({ email }).lean();

	if (!userFound) {
		return res.render('not-found', { email });
		// return res.json({ status: 'error', error: 'User not found ! ' });
	}
	if (await bcrypt.compare(password, userFound.password)) {
		const { name, surname, isVerified } = userFound;
		if (!isVerified) {
			const emailVerify = false;
			return res.render('login', { emailVerify });
			//	return res.json({ status: 'error', data: 'Please verify your account' });
		}
		const token = jwt.sign({ id: userFound._id, email: userFound.email }, JWT_SECRET);

		res.render('success', { name, surname, email, token });
		isLoginSuccess = true;
	} else {
		isPasswordCorrect = false;
		res.render('login', { isPasswordCorrect });
	}
	endTime = performance.now();

	const loginTime = (endTime - startTime) / 1000;

	if (isLoginSuccess) {
		loginTimeModel.create({ loginTime: loginTime, loginDate: moment() });
	}
};

module.exports = postLogin;
