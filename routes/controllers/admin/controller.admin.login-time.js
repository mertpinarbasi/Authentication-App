const loginTimeSchema = require('../../../models/loginTime');
const moment = require('moment');

const yesterday = moment().subtract(1, 'days');

// let oneDayAverageLogNumber = 0;

const findLatestLogsAverage = async () => {
	let allLogs = [];
	let resultLogs = [];
	let totalTime = 0;
	allLogs = await loginTimeSchema.find({}, { _id: 0 });

	allLogs.forEach((log) => {
		if (log.loginDate > yesterday) {
			resultLogs.push(log);
		}
	});

	resultLogs.forEach((log) => {
		totalTime += log.loginTime;
	});

	const average = totalTime / resultLogs.length;

	return { logs: resultLogs, average: parseFloat(average.toFixed(5)), logNumber: resultLogs.length };
};

module.exports = findLatestLogsAverage;
