const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = require('../../config/keys').JWT_SECRET;
const userModel = require('../../models/User');

const postChangePassword = async (req, res) => {
	let isChanged = true;
	const { token, newPassword } = req.body;
	console.log(req.body);

	try {
		const verified = jwt.verify(token, JWT_SECRET);
		const _id = verified.id;
		const hashedPassword = await bcrypt.hash(newPassword, 8);
		await userModel.updateOne({ _id }, { $set: { password: hashedPassword } });
	} catch (error) {
		isChanged = false;

		console.log(error);
	}

	res.render('change-password', { isChanged });
	console.log('wow');
};

module.exports = postChangePassword;
