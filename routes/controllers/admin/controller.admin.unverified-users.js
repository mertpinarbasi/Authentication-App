const userModel = require('../../../models/User');
const moment = require('moment');
const currentDate = moment();

const expiredUsers = async () => {
	const expiredUsersList = await userModel.find(
		{ 'emailToken.expiresAt': { $lte: currentDate }, isVerified: false },
		{ _id: 0, password: 0 }
	);
	return expiredUsersList;
};

module.exports = expiredUsers;
