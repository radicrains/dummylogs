const express = require('express');
const logs = express.Router();
const User = require('../models/users.js');
const Log = require('../models/logs.js');

logs.get('/', (req, res) => {
  //   console.log(req.session.currentUser);
  Log.find({})
    .populate('comments.enteredBy')
    .populate('createdBy')
    .exec(function (err, foundLogs) {
      res.render('logs/index.ejs', {
        logs: foundLogs,
        currentUser: req.session.currentUser,
      });
    });
});

logs.get('/new', (req, res) => {
  res.render('logs/new.ejs');
});

logs.get('/:logID', (req, res) => {
  Log.findById(req.params.logID, (err, foundLog) => {
    res.render('logs/show.ejs', {
      log: foundLog,
      currentUser: req.session.currentUser,
    });
  });
});

logs.post('/', (req, res) => {
  const newLog = {
    title: req.body.title,
    createdBy: req.session.currentUser._id,
    entries: [],
  };
  Log.create(newLog, () => {
    res.redirect('/logs');
  });
});

logs.post('/:logID', (req, res) => {
  const newComment = {
    comment: req.body.comment,
    enteredBy: req.session.currentUser._id,
  };
  Log.findOneAndUpdate(
    { _id: req.params.logID },
    {
      $push: {
        comments: newComment,
      },
    },
    () => {
      res.redirect('/logs');
    },
  );
});

module.exports = logs;
