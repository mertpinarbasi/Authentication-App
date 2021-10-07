const userModel = require('../../../models/User');
const moment = require('moment');

const yesterday = moment().subtract(1, 'days');
const newUsersList = async () => {
	const newUsersList = await userModel.find({ 'emailToken.createdAt': { $gte: yesterday } }, { _id: 0, password: 0 });
	return newUsersList;
};
newUsersList();

module.exports = newUsersList;
