const express = require('express');
const mongoose = require('mongoose');

const Language = require('../models/languages');
const config = require('../config');

const router = express.Router();

router.all('*', (req, res, next) => {
  if (!req.session.admin) res.redirect('/login');
  else next();
});

/* GET admin page. */
router.get('/', (req, res) => {

  /**
   * Saving data to the database before rendering, only for testing purposes.
   */

  mongoose.connect(config.connectToDatabase('segae_data'), {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('connected')
  });

  const languageData = new Language();

  languageData.title = 'JavaScript';
  languageData.author = 'dneldik';
  languageData.body = 'This is the best programming language. :)';
  languageData.hidden = false;

  languageData.save(err => {
    const dataSaved = 'data saved';
    const dataError = 'Something went wrong, nothing was saved to the database.';
    console.log(`${err ? dataError : dataSaved}`);
    db.close(() => {
      console.log('disconnected');
    });
  });

  res.render('admin', { title: 'Admin' });
});

module.exports = router;
