const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = require('../../config/keys').JWT_SECRET;
const userModel = require('../../models/User');

const postLogin = async (req, res) => {
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

		res.render('success', { name, surname, email, token });
	} else {
		return res.json({ status: 'error', data: 'Your password is incorrect' });
	}
};
module.exports = postLogin;
