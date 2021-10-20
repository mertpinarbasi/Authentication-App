const loginTimeSchema = require('../../../models/loginTime');
const moment = require('moment');
const yesterday = moment().subtract(1, 'days');

// let oneDayAverageLogNumber = 0;

const findLatestLogsAverage = async () => {
	let resultLogs = [];
	let totalTime = 0;
	resultLogs = await loginTimeSchema.find({ loginDate: { $gte: yesterday } }, { _id: 0 });

	resultLogs.forEach((log) => {
		totalTime += log.loginTime;
	});

	const average = totalTime / resultLogs.length;

	return { logs: resultLogs, average: parseFloat(average.toFixed(5)), logNumber: resultLogs.length };
};

module.exports = findLatestLogsAverage;
