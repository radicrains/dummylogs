const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();
const app = express();
const userController = require('./controllers/users.js');
const sessionsController = require('./controllers/sessions.js');
const logsController = require('./controllers/logs.js');

// Configuration
const PORT = process.env.PORT;
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});

// Middleware
// allows us to use put and delete methods
app.use(methodOverride('_method'));
// parses info from our input fields into an object
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: 'feedmeseymour', //a random string do not copy this value or your stuff will get hacked
    resave: false,
    saveUninitialized: false,
  }),
);

app.get('/', (req, res) => {
  res.render('index.ejs', {
    currentUser: req.session.currentUser,
  });
});

app.use('/users', userController);
app.use('/sessions', sessionsController);
app.use('/logs', logsController);

// Listen
app.listen(PORT, () => console.log('auth happening on port', PORT));
