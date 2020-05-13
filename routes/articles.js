const express = require('express');
const Articles = require('../models/articles');

const router = express.Router();

/* GET topics page. */
router.get('/', (req, res) => {

  const inputValue = (req.query.find || '').trim();
  const search = inputValue.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g, '\\$&');
  const find = new RegExp(search, 'i');

  Articles
    .find({ title: find })
    .sort({ date: -1 })
    .exec((err, data) => {
      res.render('articles', { title: 'Interesting articles', data, inputValue });
    });

});

module.exports = router;
