const loginTimeSchema = require('../../../models/loginTime');
const moment = require('moment');

const yesterday = moment().subtract(1, 'days');
const latestLogsArray = [];
let logs = [];
let totalTime = undefined;
// let oneDayAverageLogNumber = 0;
const result = () => {
	const findLatestLogsAverage = async () => {
		logs = await loginTimeSchema.find({});
		logs.forEach((log) => {
			if (log.loginDate > yesterday) latestLogsArray.push(log);
		});
		console.log(logs);
	};
	findLatestLogsAverage();
};
result();

latestLogsArray.forEach((log) => {
	totalTime += log.loginTime;
});
const average = totalTime / latestLogsArray.length;
module.exports = average;
