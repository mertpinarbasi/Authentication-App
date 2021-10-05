const userModel = require('../../../models/User');
const moment = require('moment');
const currentDate = moment();
let expiredUsers = [];
const unverifiedUsersResult = async () => {
	const unVerifiedUsers = await userModel.find({ isVerified: false }, { _id: 0, password: 0 });
	unVerifiedUsers.forEach((user) => {
		if (user.emailToken.expiresAt < currentDate) {
			expiredUsers.push(user);
		}
	});
};
unverifiedUsersResult();
const result = expiredUsers;

module.exports = result;
