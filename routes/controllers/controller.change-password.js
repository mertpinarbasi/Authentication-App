const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = require('../../config/keys').JWT_SECRET;
const userModel = require('../../models/User');

const postChangePassword = async (req, res) => {
	const { token, newPassword } = req.body;

	try {
		const verified = jwt.verify(token, JWT_SECRET);
		const _id = verified.id;
		const hashedPassword = await bcrypt.hash(newPassword, 8);
		await userModel.updateOne({ _id }, { $set: { password: hashedPassword } });
		res.json({ status: 'ok' });
	} catch (error) {
		res.json({ status: error });
	}
};
module.exports = postChangePassword;
