const express = require('express');
const router = express.Router();

/* GET topics page. */
router.get('/', (req, res) => {
  res.render('topics', { title: 'Topics' });
});

module.exports = router;
