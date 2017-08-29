const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const users = require('./routes/users');
const config = require('./config/database');
const carRoutes = require('./routes/carRoutes');

// Connect Database
mongoose.connect(config.database, {useMongoClient: true});

// On Connection Database
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

// Get err message connection Database
mongoose.connection.on('error', (err) => {
    console.log('Database error connection : ' + err);
});


const app = express();

const port = 3000;

// CORS Middleware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


app.use('/users', users);
app.use('/cars', carRoutes)

app.listen(port, () => {
    console.log('Server started on port ' + port);
});