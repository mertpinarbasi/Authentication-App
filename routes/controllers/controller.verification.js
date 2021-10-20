const userModel = require('../../models/User');
const moment = require('moment');
// Since the verification token is stored in the user object , if given is
// match with database the user will be verified .
const postVerification = async (req, res) => {
	let isSuccess = true;
	let errorMsg = '';
	let isExpired = false;
	try {
		const { token } = req.body;

		const user = await userModel.findOne({ 'emailToken.token': token });
		if (user) {
			if (moment() > user.emailToken.expiresAt) {
				errorMsg = 'Your verification code is expired';
				isSuccess = false;
				isExpired = true;
				res.render('verification', { isSuccess, errorMsg, isExpired });
			} else {
				user.isVerified = true;
				await user.save();
				res.redirect('/authUser/login');
			}
		} else {
			errorMsg = 'Invalid code ';
			isSuccess = false;
			return res.render('verification', { isSuccess, errorMsg });
		}
	} catch (error) {
		// console.log(error);
	}
};
module.exports = postVerification;
