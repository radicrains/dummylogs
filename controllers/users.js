const express = require('express');
const users = express.Router();
const User = require('../models/users.js');

users.get('/new', (req, res) => {
  res.render('users/new.ejs');
});

users.post('/', (req, res) => {
  // console.log(req.body);
  User.create(req.body, (err, createdUser) => {
    console.log(req.body);
    if (err) {
      console.log(err);
    }
    console.log(createdUser);
    res.redirect('/');
  });
});

module.exports = users;
