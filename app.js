const express = require('express');
/* global localStorage, */

const app = express();
const router = require('./routes/index');
const authUser = require('./routes/authUser');

const PORT = process.env.PORT || 9500;
const mongoose = require('mongoose');

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('view engine', 'ejs');
// Body Parser
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
	console.log(`App is started at ${PORT} port`);
});

// mongoDB
const mongoDB = require('./config/keys').MONGO_URL;
mongoose
	.connect(mongoDB, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('mongoDB is ready'))
	.catch((err) => console.log(err));
// Routes

app.use('/', router);

app.use('/authUser', authUser);
