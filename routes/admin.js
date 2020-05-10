const express = require('express');
const mongoose = require('mongoose');

const Language = require('../models/languages');
const config = require('../config');

const router = express.Router();

const setDbConnection = (path) => {
  mongoose.connect(config.connectToDatabase(path), {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => { console.log('connected'); });
  return db
};

router.all('*', (req, res, next) => {
  if (!req.session.admin) res.redirect('/login');
  else next();
});

/* GET admin page. */
router.get('/', (req, res) => {

  const db = setDbConnection('segae_data');

  Language.find({}, (err, data) => {
    if (err) {
      db.close(() => { console.log('Data loading error, disconnected'); });
      res.render('admin/index', { title: 'Admin' });
    }
    else {
      db.close(() => { console.log('disconnected'); });
      res.render('admin/index', { title: 'Admin', data });
    }
  });

});

/* GET send page. */
router.get('/send', (req, res) => {
  res.render('admin/add-content', { title: 'Add new article', body: {} });
});

/* POST send page. */
router.post('/send', (req, res) => {

  const languageData = new Language(req.body);
  req.body.hidden ? languageData.hidden = true : languageData.hidden = false;

  const errors = languageData.validateSync();
  const db = setDbConnection('segae_data');

  languageData.save(err => {

    if (err) {
      res.render('admin/add-content', { title: 'Add new article', errors, body: req.body });
      console.log('Something went wrong, nothing was saved to the database.');
    } else {
      res.redirect('/admin');
      console.log('data saved');
    }
    db.close(() => { console.log('disconnected'); });

  });

});

/* GET admin page. */
router.get('/delete/:id', (req, res) => {

  const db = setDbConnection('segae_data');

  Language.findByIdAndDelete(req.params.id, (err) => {

    if (err) {
      res.render('admin/index', { title: 'Admin' });
      console.log('unable to delete data');
    } else {
      res.redirect('/admin');
      console.log('data deleted');
    }
    db.close(() => { console.log('disconnected'); });

  });

});

module.exports = router;
