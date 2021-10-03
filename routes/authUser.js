const express = require('express');
const authUser = express.Router();

const postRegister = require('./controllers/controller.register');
const postLogin = require('./controllers/controller.login');
const postVerification = require('./controllers/controller.verification');
const postChangePassword = require('./controllers/controller.change-password');
const postLostPassword = require('./controllers/controller.lost-password');

authUser.get('/login', (req, res) => {
	res.render('login');
});
authUser.get('/lost-password', (req, res) => {
	res.render('lost-password');
});
authUser.get('/register', (req, res) => {
	res.render('register');
});

authUser.get('/change-password', (req, res) => {
	res.render('change-password');
});

authUser.get('/verification', async (req, res) => {
	res.render('verification');
});

authUser.post('/register', postRegister);
authUser.post('/login', postLogin);
authUser.post('/verification', postVerification);
authUser.post('/change-password', postChangePassword);
authUser.post('/lost-password', postLostPassword);
module.exports = authUser;
