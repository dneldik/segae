const express = require('express');
const Articles = require('../models/articles');

const router = express.Router();

router.all('*', (req, res, next) => {
  if (!req.session.admin) res.redirect('/login');
  else next();
});

/* GET admin page. */
router.get('/', (req, res) => {

  const dateFormat = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };
  Articles.find({}, (err, data) => {
    if (err) {
      res.render('admin/index', { title: 'Admin' });
      return;
    }
    res.render('admin/index', { title: 'Admin', data, dateFormat });
  });

});

/* GET send page. */
router.get('/send', (req, res) => {
  res.render('admin/add-content', { title: 'Add new article', body: {} });
});

/* POST send page. */
router.post('/send', (req, res) => {

  const lines = req.body.body.split("\n");
  req.body.body = lines;

  const articlesData = new Articles(req.body);
  req.body.show ? articlesData.show = true : articlesData.show = false;
  const errors = articlesData.validateSync();

  articlesData.save(err => {

    if (err) {
      res.render('admin/add-content', { title: 'Add new article', errors, body: req.body });
      console.log('Something went wrong, nothing was saved to the database.');
    } else {
      res.redirect('/admin');
      console.log('data saved');
    }

  });

});

/* GET admin page. */
router.get('/delete/:id', (req, res) => {

  Articles.findByIdAndDelete(req.params.id, (err) => {

    if (err) {
      res.render('admin/index', { title: 'Admin' });
      console.log('unable to delete data');
    } else {
      res.redirect('/admin');
      console.log('data deleted');
    }

  });

});

module.exports = router;
