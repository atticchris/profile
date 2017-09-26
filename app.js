const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/db')

// Connect to db
mongoose.connect(config.db, { useMongoClient: true });
mongoose.connection.on('connected', () => {
	console.log('app.js: Connected to database' + config.db+ '\n');
});
mongoose.connection.on('error', (err) => {
	console.log('app.js: Database Error: ' + err + '\n');
});


const app = express();


const users = require('./routes/users');


// Port Nr
const port = 3000;

// Access from Domain * through Cors Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));



// Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
	res.send('Invalid Entrypoint');
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Starting Server
app.listen(port, () => {
	console.log('\napp.js: Server started on Port ' + port+ '\n');
});

  