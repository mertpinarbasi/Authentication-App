const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = require('../../config/keys').JWT_SECRET;
const userModel = require('../../models/User');
// The token which is stored in the localStorage after the login operation will be taken by using request .
// If JWT token is verified the user is able to change the account's password.
const postChangePassword = async (req, res) => {
	let isChanged = true;
	let errorString = null;
	const { token, newPassword } = req.body;
	if (newPassword.length < 5) {
		isChanged = false;

		errorString = 'The password must be longer than 5 characters.';
	}
	try {
		const verified = jwt.verify(token, JWT_SECRET);
		const _id = verified.id;
		const hashedPassword = await bcrypt.hash(newPassword, 8);
		await userModel.updateOne({ _id }, { $set: { password: hashedPassword } });
	} catch (error) {
		isChanged = false;
		errorString = JSON.stringify(error);
	}

	res.render('change-password', { isChanged, errorString });
};

module.exports = postChangePassword;
