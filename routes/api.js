const express = require('express');
const Articles = require('../models/articles');

const router = express.Router();

/* GET public API. */
router.get('/', (req, res) => {

  const search = req.query.search || '';
  const sort = req.query.sort || -1;

  Articles
    .find({ title: RegExp(search.trim(), 'i') })
    .sort({ date: Number(sort) })
    .select('_id title author body')
    .exec((err, data) => {
      res.json(data);
    });

});

router.get('/:id', (req, res) => {

  const id = req.params.id;

  Articles.findById(id)
    .select('_id title author body')
    .exec((err, data) => {
      res.json(data);
    });

});

module.exports = router;