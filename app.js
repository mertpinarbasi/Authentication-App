const express = require('express');
const app = express();
const process = require('process');
const router = require('./routes/index');
const admin = require('./routes/admin');
const authUser = require('./routes/authUser');

const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, () => {
	console.log(`App is started at ${PORT} port`);
});

// mongoDB database connection
const mongoDB = require('./config/keys').MONGO_URL;
mongoose
	.connect(mongoDB, {
		useNewUrlParser: true,

	})
	.then(() => console.log('mongoDB is ready'))
	.catch((err) => console.log(err));

// Routes

// router is the main router for the home-page of the application
app.use('/', router);
// authUser router is used for authentication operations
app.use('/authUser', authUser);
// admin router is used for listing various log information from the database
app.use('/admin', admin);
