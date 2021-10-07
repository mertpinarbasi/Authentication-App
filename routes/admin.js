const express = require('express');
const admin = express.Router();
const unverifiedUsersResult = require('../routes/controllers/admin/controller.admin.unverified-users');
const newUsersList = require('../routes/controllers/admin/controller.admin.new-users-list');
const loginInformationFunction = require('../routes/controllers/admin/controller.admin.login-time');
admin.get('/', (req, res) => {
	res.render('../views/admin/admin');
});
admin.get('/newUserList', (req, res) => {
	res.render('../views/admin/new-user-list', { newUsersList });
});
admin.get('/unverifiedUsers', (req, res) => {
	res.render('../views/admin/unverified-users', { unverifiedUsersResult });
});
admin.get('/loginProcessTime', (req, res) => {
	loginInformationFunction().then((result) => {
		const loginInformation = result;
		res.render('../views/admin/login-process-time', { loginInformation });
	});
});

module.exports = admin;
