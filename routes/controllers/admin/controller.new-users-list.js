const userModel = require('../../../models/User');
const moment = require('moment');

const yesterday = moment().subtract(1, 'days');
let newUsersListArray = [];
const newUsersList = async () => {
	const newUsersList = await userModel.find({}, { _id: 0, password: 0 });
	newUsersList.forEach((user) => {
		if (user.emailToken.createdAt > yesterday) {
			newUsersListArray.push(user);
		}
	});
};
newUsersList();
const result = newUsersListArray;
module.exports = result;
