const process = require('process')

const path = require('path');
require('dotenv').config({
  path: path.resolve('config.env'),
});
const config  = {
	MONGO_URL : process.env.MONGO_URL,
	JWT_SECRET : process.env.JWT_SECRET,
	SENDGRID_API_KEY : process.env.SENDGRID_API_KEY
}

module.exports = config
