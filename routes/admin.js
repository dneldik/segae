const express = require('express');
const router = express.Router();

router.all('*', (req, res, next) => {
  if (!req.session.admin) res.redirect('/login');
  else next();
});

/* GET admin page. */
router.get('/', (req, res) => {
  res.render('admin', { title: 'Admin' });
});

module.exports = router;
