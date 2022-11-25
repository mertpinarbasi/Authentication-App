const express = require('express');
const authUser = express.Router();

const postRegister = require('./controllers/controller.register');
const postLogin = require('./controllers/controller.login');
const postVerification = require('./controllers/controller.verification');
const postChangePassword = require('./controllers/controller.change-password');
const postLostPassword = require('./controllers/controller.lost-password');
const postResendVerification = require('./controllers/controller.resend-verification');
const verifyOtp = require("./controllers/controller.verify-otp")
const disableOtp = require("./controllers/controller.otp-disable");

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

authUser.get('/verification', (req, res) => {
	res.render('verification');
});
authUser.get('/resend-verification', (req, res) => {
	res.render('resend-verification');
});
authUser.get('/otp-verification', (req, res) => {
	res.render('otp-verification')
})
authUser.get("/disable-otp", (req, res) => {
	res.render('disable-otp')
})

authUser.post('/register', postRegister);
authUser.post('/login', postLogin);
authUser.post('/verification', postVerification);
authUser.post('/change-password', postChangePassword);
authUser.post('/lost-password', postLostPassword);
authUser.post('/resend-verification', postResendVerification);
authUser.post('/otp-verification', verifyOtp);
authUser.post("/disable-otp", disableOtp)

module.exports = authUser;
