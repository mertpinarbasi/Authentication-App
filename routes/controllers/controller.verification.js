const userModel = require('../../models/User');

const postVerification = async (req, res) => {
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
};
module.exports = postVerification;
