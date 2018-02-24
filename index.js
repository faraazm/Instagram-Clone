const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const passport = require('passport');
const cors = require('cors');

require('./models/User');
require('./models/Post');

mongoose.connect(keys.mongoURI, (err) => {
	if(err) throw err
	else console.log("Successfully connected to MongoDB");
});

//Routes
const index = require('./routes/index');
const user = require('./routes/users');
const auth = require('./routes/auth');

const app = express();
console.log(__dirname);
app.use(cors());

app.use(passport.initialize());
require('./services/passport')(passport);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', index);
app.use('/api/user', user);
app.use('/api/auth', auth);

if(process.env.NODE_ENV === 'production'){
	app.use(express.static('client/build'));
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	})
}

const PORT = process.env.PORT || 8080;
app.listen(PORT);

module.exports = app;
